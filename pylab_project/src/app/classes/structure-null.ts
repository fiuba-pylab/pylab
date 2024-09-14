import { evaluate, replaceVariables } from "../utils";
import { Structure } from "./structure";

const REGEX_VARIABLE_DECLARATION = /(\w+)\s*=\s*(.+)/;
const REGEX_OPERATIONS = /(\w+)\s*(\+=|-=|\*=|\/=)\s*(.+)/;
const REGEX_NATIVE_FUNCTIONS = /\b(float|int|len|str)\s*\(([^()]+)\)/g;
const REGEX_MATH_FUNCTIONS = /math\.(\w+)\(([^()]*(?:\([^()]*\)[^()]*)*)\)/g;


const operations = {
    '+=': (a: number, b: number) => a + b,
    '-=': (a: number, b: number) => a - b,
    '*=': (a: number, b: number) => a * b,
    '/=': (a: number, b: number) => a / b,
};

type Operator = keyof typeof operations;
export class NullStructure extends Structure {
    super() { }

    setScope(code: any) {
        const lines: any[] = code.split('\n');
        this.lines.push(lines[0]);
    }

    override execute(): { amount: number, finish: boolean } {
        this.lines[0] = this.lines[0].trim();
        if (this.lines[0].split(' ')[0] == 'elif') {
            return { amount: 0, finish: true };
        }
        const variableDeclaration = this.lines[0].match(REGEX_VARIABLE_DECLARATION);
        const operations = this.lines[0].match(REGEX_OPERATIONS);
        if (variableDeclaration) {
            const varName = variableDeclaration[1];
            let varValue = applyFunctions(variableDeclaration[2], this.variables);
            this.variables[varName] = evaluate(varValue);
        }
        if (operations) {
            const variable = operations[1];
            const operator = operations[2];
            const value = operations[3];
            this.variables[variable] = applyOperation(Number(this.variables[variable]), operator, Number(value));
        }

        this.codeService.updateVariables(this.variables);
        return { amount: 1, finish: true };
    }
}

function applyOperation(variableValue: number, operator: Operator, value: number): number {
    if (operator in operations) {
        return operations[operator](variableValue, value);
    } else {
        throw new Error('Operador no soportado');
    }
}

function applyFunctions(variableValue: any, variables: any) {
    let result = variableValue;
    result = replaceVariables(result, variables);
    result = applyNativeFunctions(result, variables);
    result = applyMathFunctions(result, variables);
    return result;
}

function applyNativeFunctions(variableValue: any, variables: any) {
    return variableValue.replace(REGEX_NATIVE_FUNCTIONS, (match: any, funcName: any, args: string | any[]) => {
        switch (funcName) {
            case 'float':
                return Number(args);
            case 'int':
                return parseInt(args as string); 
            case 'len':
                return (args as string).length; 
            case 'str':
                return String(args);
            default:
                return match; 
        }
    });
}

function applyMathFunctions(variableValue: any, variables: any) {
    // TODO: lógica números imaginarios
    return variableValue.replace(REGEX_MATH_FUNCTIONS, (match: any, funcName: any, args: string | any[]) => {
        switch (funcName) {
            case 'pow':
                return Math.pow(Number((args as string).split(',')[0]), Number((args as string).split(',')[1]));
            case 'sqrt':
                return Math.sqrt(Number(evaluate(args)));
            case 'round':
                return Math.round(Number(evaluate(args)));
            case 'asin':
                return Math.asin(Number(evaluate(args)));
            case 'log10':
                return Math.log10(Number(evaluate(args)));
            default:
                return match; 
        } 
    });
}

/* 
float()
int()
round()
len()
str()

math.sqrt
math.log10
math.asin
math.pow

input 
print

return 
break
*/