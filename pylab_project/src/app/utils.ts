import { Collection } from "./classes/collection";
import { Dictionary } from "./classes/dictionary";
import { List } from "./classes/list";
import { Tuple } from "./classes/tuple";
import { NATIVE_FUNCTIONS, REGEX_CONSTS } from "./constants";

export function replaceVariables(template: string, valores: { [clave: string]: any[] }): string {

    return Object.entries(valores).reduce((resultado, [clave, valor]) => {
        const regex = new RegExp(`\\b${escapeRegExp(clave)}\\b`, 'g');
        var replacement;
        let leftCollectionDelimeter = ''
        let rightCollectionDelimeter = ''
        if (valor instanceof List) {
            leftCollectionDelimeter = '['
            rightCollectionDelimeter = ']'
            replacement = valor.values
        }else if(valor instanceof Dictionary){
            leftCollectionDelimeter = '{'
            rightCollectionDelimeter = '}'
        } else if (valor instanceof Tuple) {
            replacement = `${clave}`
        } else{
            if(typeof valor === 'string'){
                if(`'${valor}'`.match(NATIVE_FUNCTIONS.NONE)){
                    replacement = 'None'
                } else {
                    replacement = `'${valor}'`
                }
            } else {
                replacement = valor
            }
        }
       
        return resultado.replace(regex, leftCollectionDelimeter + replacement + rightCollectionDelimeter);
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

    code = code.replace(NATIVE_FUNCTIONS.NONE, "'None'")

    const regexMultiplyLetters = /(\([\w\s+-/*]+\))\*['"]([a-zA-Z])['"]/g;
    
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
            return result.toString();
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
        const collection = matchCollection(code)
        if(collection && !code.match(REGEX_CONSTS.REGEX_COLLECTION_ACCESS)){
            return collection
        } 
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

export function matchCollection(varValue: string, variables?:any) {
    let varMatch;
    if (varValue.match(REGEX_CONSTS.REGEX_LIST)) {
        const values:any = varValue.slice(1, varValue.length - 1).replace(/\, /g, ',').split(',');
        for(let i = 0; i<values.length; i++){
            let variable;
            if(variables && (variable = variables[values[i]])){
                values[i] = variable
            }
            
        }
        return new List(values);
    } else if (varMatch = varValue.match(REGEX_CONSTS.REGEX_DICTIONARY)) {
        const dictionaryElements = varMatch[1].replace(', ', ',').split(',');
        const dictionary = new Dictionary();
        let element;
        for (element of dictionaryElements) {
            dictionary.add(element.toString());
        }
        return dictionary;
    } else if (varValue.match(REGEX_CONSTS.REGGEX_SET)) {
        const values = varValue.slice(1, varValue.length - 1).replace(', ', ',').split(',');
        return new Set(values);
    } else if (varValue.match(REGEX_CONSTS.REGGEX_TUPLE)) {
        const values = varValue.slice(1, varValue.length - 1).replace(', ', ',').split(',');
        return new Tuple(values);
    }  else {
        return null;
    }

}

