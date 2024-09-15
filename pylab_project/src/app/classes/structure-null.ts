import { evaluate, replaceVariables } from "../utils";
import { Structure } from "./structure";

const REGEX_VARIABLE_DECLARATION = /(\w+)\s*=\s*(.+)/;
const REGEX_OPERATIONS = /(\w+)\s*(\+=|-=|\*=|\/=)\s*(.+)/;
const REGEX_FUNCTIONS = /\b(float|int|len|str|math\.\w+)\s*\(([^()]+)\)/g;
const RETURN_BREAK = /\b(return|break)\b(?:\s+[^;]*)?;/g;


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
        const print = this.lines[0].match(/print\(([^()]+)\)/);
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

        if(print){
            let value = applyFunctions(print[1], this.variables);
            this.codeService.setPrint(value.replace(/^"(.*)"$/, '$1'));
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
    result = evaluateExpression(result);
    return result;
}

function evaluateFunction(funcName: string, args: string): string {
    // TODO: lógica números imaginarios
    args = evaluate(args);
    switch (funcName) {
        case 'float':
            return String(Number(args));
        case 'int':
            return String(parseInt(args));
        case 'len':
            return String((args as string).length); 
        case 'str':
            return String(args);
        case 'math.pow':
            let funcArgs = (args as string).split(',');
            return (Math.pow(Number(funcArgs[0]), Number(funcArgs[1]))).toString();
        case 'math.sqrt':
            return (Math.sqrt(Number(args))).toString();
        case 'math.round':
            funcArgs = (args as string).split(',');
            if (funcArgs.length > 1) {
                return Number(funcArgs[0]).toFixed(Number(funcArgs[1])).toString();
            }
            return (Math.round(Number(args))).toString();
        case 'math.asin':
            return (Math.asin(Number(args))).toString();
        case 'math.log10':
            return (Math.log10(Number(args))).toString();
        default:
            return args; 
    }
}

function evaluateExpression(expression: string): string {
    let previousExpression;
    let currentExpression = expression;

    do {
        previousExpression = currentExpression;
        currentExpression = currentExpression.replace(REGEX_FUNCTIONS, (match, funcName, args) => {
            let evaluatedArgs = args.split(',').map((arg: string) => evaluateExpression(arg.trim())).join(',');
            return evaluateFunction(funcName, evaluatedArgs);
        });
    } while (currentExpression !== previousExpression);

    return currentExpression;
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