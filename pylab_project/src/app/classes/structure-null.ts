import { evaluate, replaceVariables } from "../utils";
import { Structure } from "./structure";

const REGEX_VARIABLE_DECLARATION = /(\w+)\s*=\s*(.+)/;
const REGEX_OPERATIONS = /(\w+)\s*(\+=|-=|\*=|\/=)\s*(.+)/;
const REGEX_FUNCTIONS = /\b(float|int|len|str|math\.\w+)\s*\(([^()]+)\)/g;
const RETURN_BREAK_RETURN = /\b(return|break)\b(?:\s+[^;]*)?;/g;
const REGEX_PRINT = /print\s*\(\s*(['"]?)(.*?)\1\s*\)/;
const REGEX_REMOVE_BRACES = /{(\w+)}/g;

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
        const variables = this.variablesService.getVariables(this.context);
        this.lines[0] = this.lines[0].trim();
        if (this.lines[0].split(' ')[0] == 'elif') {
            return { amount: 0, finish: true };
        }

        const variableDeclaration = this.lines[0].match(REGEX_VARIABLE_DECLARATION);
        const operations = this.lines[0].match(REGEX_OPERATIONS);
        const print = this.lines[0].match(REGEX_PRINT);

        if (variableDeclaration) {
           const varName = variableDeclaration[1];
           let varValue = applyFunctions(variableDeclaration[2], variables);
           if(!variables[varName]){
                variables[varName] = []
           }
           variables[varName].push(evaluate(varValue));
        }
        if (operations) {
            const variable = operations[1];
            const operator = operations[2];
            const value = operations[3];
            variables[variable].push(applyOperation(Number(variables[variable][variables[variable].length -1]), operator, Number(value)));

        }
        if(print){
            let value = print[1]
            if(print[2]){
                value = print[2]
            }
            let printValue = replaceVariablesInPrint(value, variables);
            printValue = evaluateExpression(printValue);
            printValue = cleanPrintValue(printValue)
            this.codeService.setPrint(printValue);
        }
        this.variablesService.setVariables(this.context, variables);
        //  this.codeService.updateVariables(this.variables);
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
    let evalArgs = evaluate(args);
    switch (funcName) {
        case 'float':
            return String(Number(evalArgs));
        case 'int':
            return String(parseInt(evalArgs));
        case 'len':
            return String((evalArgs as string).length); 
        case 'str':
            return String(evalArgs);
        case 'math.pow':
            var funcArgs = (args as string).split(',');
            return (Math.pow(Number(funcArgs[0]), Number(funcArgs[1]))).toString();
        case 'math.sqrt':
            return (Math.sqrt(Number(evalArgs))).toString();
        case 'math.round':
            var funcArgs = (args as string).split(',');
            if (funcArgs.length > 1) {
                return Number(funcArgs[0]).toFixed(Number(funcArgs[1])).toString();
            }
            return (Math.round(Number(evalArgs))).toString();
        case 'math.asin':
            return (Math.asin(Number(evalArgs))).toString();
        case 'math.log10':
            return (Math.log10(Number(evalArgs))).toString();
        default:
            return evalArgs; 
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

function cleanPrintValue(value: string): string {
    value = value.replace(/^[^'"]*['"]/, '');
    value = value.replace(/^"|'(.*)"|'$/, '$1');
    value = value.replace(REGEX_REMOVE_BRACES, '$1');
    value = value.replace(/\\n|\n/g, '<br>');
    value = value.replace(/\\t|\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
    return value;
}

function replaceVariablesInPrint(template: string, valores: { [clave: string]: string }): string {
    return Object.entries(valores).reduce((resultado, [clave, valor]) => {
        const regex = new RegExp(`\\{\\b${printVarRegex(clave)}\\b\\}`, 'g');
        return resultado.replace(regex, valor);
    }, template);
}

function printVarRegex(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
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