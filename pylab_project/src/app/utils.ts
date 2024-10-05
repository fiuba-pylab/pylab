import { Collection } from "./classes/collection";
import { REGEX_CONSTS } from "./constans";

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
    return template.replace(/and/g, '&&').replace(/or/g, '||');
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


    try {
        return eval(code);
    } catch (e) {
        console.error(e);
        return code;
    }
}
