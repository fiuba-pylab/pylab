
export function replaceVariables(template: string, valores: { [clave: string]: string }): string {
    return Object.entries(valores).reduce((resultado, [clave, valor]) => {
        const regex = new RegExp(`\\b${escapeRegExp(clave)}\\b`, 'g');
        return resultado.replace(regex, valor);
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
    return eval(code);
}