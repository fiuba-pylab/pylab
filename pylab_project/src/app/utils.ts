import { Collection } from "./classes/collection";
import { REGEX_CONSTS } from "./constans";

export function replaceVariables(template: string, valores: { [clave: string]: any }): string {
    return Object.entries(valores).reduce((resultado, [clave, valor]) => {
        const regex = new RegExp(`\\b${escapeRegExp(clave)}\\b`, 'g');
        return resultado.replace(regex, (valor instanceof Collection)? valor.values:valor[valor.length - 1]);
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
    if(match){
        const [_, number, collection] = match;
        return collection.split(',').map((num: string) => parseInt(num)).includes(parseInt(number));
    }
    if(code.includes('//')){
        const lines = code.split(' ').map((line: string) => parseInt(line.trim()));
        return Math.floor(lines[0] / lines[2]);
    }
    if(code.includes('**')){
        const lines = code.split(' ').map((line: string) => parseInt(line.trim()));
        return Math.pow(lines[0], lines[2]);
    }
    try {
        return eval(code);
    } catch (e) {
        console.error(e);
        return code;
    }
}