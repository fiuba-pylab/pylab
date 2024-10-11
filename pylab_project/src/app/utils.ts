import { Collection } from "./classes/collection";
import { REGEX_CONSTS } from "./constants";

export function replaceVariables(template: string, valores: { [clave: string]: any[] }): string {
    return Object.entries(valores).reduce((resultado, [clave, valor]) => {
        const regex = new RegExp(`\\b${escapeRegExp(clave)}\\b`, 'g');
        var replacement;
        if (valor instanceof Collection) {
            replacement = valor.values;
        } else {
            const lastValue = valor[valor.length - 1];
            replacement = typeof lastValue === 'string' ? `'${lastValue}'` : lastValue;
        }
       
        return resultado.replace(regex, replacement);
    }, template);
}
function escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function replaceOperators(template: string): string {
    return template
            .replace(/and/g, '&&')
            .replace(/or/g, '||')
            .replace(/is not/g, '!=')
            .replace(/is/g, '==')
            .replace(/False/g, 'false')
            .replace(/True/g, 'true');
}

export function evaluate(code: any): any {
    // TODO: Sanitize input
    const match = code.match(REGEX_CONSTS.REGEX_IN_OPERATION);
    if (match) {
        const [_, number, collection] = match;
        return collection.split(',').map((num: string) => parseInt(num)).includes(parseInt(number));
    }

    const divisionRegex = /(\d+)\s*\/\/\s*(\d+)/;
    while (divisionRegex.test(code)) {
        code = code.replace(divisionRegex, (match: any, num1: string, num2: string) => {
            const result = Math.floor(parseInt(num1) / parseInt(num2));
            return result.toString(); // Replace with the result
        });
    }

    const exponentRegex = /(\d+)\s*\*\*\s*(\d+)/;
    while (exponentRegex.test(code)) {
        code = code.replace(exponentRegex, (match: any, num1: string, num2: string) => {
            const result = Math.pow(parseInt(num1), parseInt(num2));
            return result.toString();
        });
    }

    if(code.match(REGEX_CONSTS.IMAGINARY)){
        return complex_evaluation(code)
    }
    try {
        console.log("code", code)
        return eval(code);
    } catch (e) {
        console.error(e);
        return code;
    }
}

function complex_evaluation(code:string){
    const imaginary = code.match(REGEX_CONSTS.IMAGINARY)??''
    const real_part = eval(code.replace(imaginary[0], ''))
    const imaginary_part = eval(code.replace(REGEX_CONSTS.REAL, '').replace('i',''))
    return real_part + ` ${imaginary[0][0]} ` + imaginary_part + 'i'
}

