import { Collection } from "./classes/collection";
import { REGEX_CONSTS } from "./constants";

export function replaceVariables(template: string, valores: { [clave: string]: any }): string {
    return Object.entries(valores).reduce((resultado, [clave, valor]) => {
        const regex = new RegExp(`\\b${escapeRegExp(clave)}\\b`, 'g');
        return resultado.replace(regex, (valor instanceof Collection)? valor.values:valor[valor.length - 1]);
    }, template);
}

export function escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function replaceOperators(template: string): string {
    return template.replace(/and/g, '&&').replace(/or/g, '||');
}

export function evaluate(code: any): any {
    // TODO: Sanitize input
    if(code.includes('//')){
        const lines = code.split(' ').map((line: string) => parseInt(line.trim()));
        return Math.floor(lines[0] / lines[2]);
    }
    if(code.includes('**')){
        const lines = code.split(' ').map((line: string) => parseInt(line.trim()));
        return Math.pow(lines[0], lines[2]);
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

