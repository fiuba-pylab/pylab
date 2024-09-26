import { Collection } from "./classes/collection";

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
    try {
        return eval(code);
    } catch (e) {
        console.error(e);
        return code;
    }
}