import { Collection } from "./classes/collection";
import { REGEX_CONSTS } from "./constants";

export function replaceVariables(template: string, valores: { [clave: string]: any[] }): string {
    return Object.entries(valores).reduce((resultado, [clave, valor]) => {
        const regex = new RegExp(`\\b${escapeRegExp(clave)}\\b`, 'g');
        var replacement;
        var collectionDelimiter = ''
        if (valor instanceof Collection) {
            collectionDelimiter = '|'
            replacement = valor.values
        } else {
            replacement = typeof valor === 'string' ? `'${valor}'` : valor;
        }
       
        return resultado.replace(regex, collectionDelimiter + replacement + collectionDelimiter);
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

    const regexMultiplyLetters = /(\([\w\s+-/*]+\))\*['"]([a-zA-Z])['"]/g;
    
    // Reemplaza multiplicación de letras, evaluando la expresión numérica dentro de los paréntesis
    code = code.replace(regexMultiplyLetters, (match: any, expr: string, letter: string) => {
        // Evalúa la expresión matemática (unidad-5) dentro de los paréntesis
        const number = eval(expr.trim());
        // Repite la letra tantas veces como el resultado de la expresión
        return `'${letter.repeat(number)}'`;
    });

    const collection_values = code.match(REGEX_CONSTS.COLLECTION_IDENTIFIER)
    if(collection_values){
        return code.replace(/,|\|/g, '')
    }

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

