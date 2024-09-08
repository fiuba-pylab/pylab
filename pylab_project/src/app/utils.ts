export function replaceVariables(template: string, valores: { [clave: string]: string }): string {
    return Object.entries(valores).reduce((resultado, [clave, valor]) => 
        resultado.replace(new RegExp(escapeRegExp(clave), 'g'), valor),
        template
    );
}

export function escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function replaceOperators(template: string): string {
    return template.replace(/and/g, '&&').replace(/or/g, '||');
}