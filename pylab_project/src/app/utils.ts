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
    const match_multiply = code.match(REGEX_CONSTS.REGEX_MULTIPLY_LETTERS)
    if(match_multiply){
        return match_multiply[2].repeat(Number(eval(match_multiply[1])))
    }

    const regexMultiplyLetters = /(\([\w\s+-/*]+\))\*['"]([a-zA-Z])['"]/g;
    
    // Reemplaza multiplicación de letras, evaluando la expresión numérica dentro de los paréntesis
    code = code.replace(regexMultiplyLetters, (match: any, expr: string, letter: string) => {
        // Evalúa la expresión matemática (unidad-5) dentro de los paréntesis
        const number = eval(expr.trim());
        // Repite la letra tantas veces como el resultado de la expresión
        return `'${letter.repeat(number)}'`;
    });

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

