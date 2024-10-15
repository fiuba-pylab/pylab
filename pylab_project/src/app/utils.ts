import { Collection } from "./classes/collection";
import { REGEX_CONSTS } from "./constants";

export function replaceVariables(template: string, valores: { [clave: string]: any[] }): string {
    return Object.entries(valores).reduce((resultado, [clave, valor]) => {
        const regex = new RegExp(`\\b${escapeRegExp(clave)}\\b`, 'g');
        var replacement;
        if (valor instanceof Collection) {
            replacement = valor.values;
        } else {
            replacement = typeof valor === 'string' ? `'${valor}'` : valor;
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
    const match_multiply = code.match(REGEX_CONSTS.REGEX_MULTIPLY_LETTERS)
    if(match_multiply){
        return match_multiply[2].repeat(Number(eval(match_multiply[1])))
    }
    
    code = code.replace(REGEX_CONSTS.REGEX_MULTIPLY_LETTERS, (match: any, expr: string, letter: string) => {
        const number = eval(expr.trim());
        return `'${letter.repeat(number)}'`;
    });


    const match = code.match(REGEX_CONSTS.REGEX_IN_OPERATION);
    if (match) {
        const [_, number, collection] = match;
        return collection.split(',').map((num: string) => parseInt(num)).includes(parseInt(number));
    }

    while (REGEX_CONSTS.REGEX_DIVISION.test(code)) {
        code = code.replace(REGEX_CONSTS.REGEX_DIVISION, (match: any, num1: string, num2: string) => {
            const result = Math.floor(parseInt(num1) / parseInt(num2));
            return result.toString(); // Replace with the result
        });
    }

   
    while (REGEX_CONSTS.REGEX_EXPONENT.test(code)) {
        code = code.replace(REGEX_CONSTS.REGEX_EXPONENT, (match: any, num1: string, num2: string) => {
            const result = Math.pow(parseFloat(num1), parseFloat(num2));
            return result.toString();
        });
    }

    if(code.match(REGEX_CONSTS.IMAGINARY)){
        return complex_evaluation(code)
    }
    
    try {
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

