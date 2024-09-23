import { firstValueFrom } from "rxjs";
import { CodeService } from "../services/code.service";
import { evaluate, replaceVariables } from "../utils";
import { Structure } from "./structure";
import { ProgramInput } from "../pages/program-display/program-input/program-input.component";

const REGEX_VARIABLE_DECLARATION = /(\w+)\s*=\s*(.+)/;
const REGEX_OPERATIONS = /(\w+)\s*(\+=|-=|\*=|\/=)\s*(.+)/;
const REGEX_FUNCTIONS = /\b(input|float|int|len|str|math\.\w+)\s*\(([^()]+)\)/g;
const RETURN_BREAK_RETURN = /\b(return|break)\b(?:\s+[^;]*)?;/g;
const REGEX_PRINT = /print\s*\(\s*(['"]?)(.*?)\1\s*\)/;
const REGEX_RETURN = /^\s*return(?:\s+(.*))?$/;

const operations = {
    '+=': (a: number, b: number) => a + b,
    '-=': (a: number, b: number) => a - b,
    '*=': (a: number, b: number) => a * b,
    '/=': (a: number, b: number) => a / b,
};

type Operator = keyof typeof operations;
export class NullStructure extends Structure {
    super(){}
    setScope(code: any) {
        const lines: any[] = code.split('\n');
        this.lines.push(lines[0]);
    }

    override async execute(): Promise<{ amount: number; finish: boolean; }> {
        const variables = this.variablesService.getVariables(this.context);
        this.lines[0] = this.lines[0].trim();
        if (this.lines[0].split(' ')[0] == 'elif') {
            return { amount: 0, finish: true };
        }
        const variableDeclaration = this.lines[0].match(REGEX_VARIABLE_DECLARATION);
        const operations = this.lines[0].match(REGEX_OPERATIONS);
        const print = this.lines[0].match(REGEX_PRINT);
        const isReturn = this.lines[0].match(REGEX_RETURN);
        if (variableDeclaration) {
           const varName = variableDeclaration[1];
           let varValue = await this.applyFunctions(variableDeclaration[2], variables, varName);
           if(!variables[varName]){
                variables[varName] = []
           }
           variables[varName].push(evaluate(varValue));
        }
        if (operations) {
            const variable = operations[1];
            const operator = operations[2];
            const value = operations[3];
            variables[variable].push(this.applyOperation(Number(variables[variable][variables[variable].length -1]), operator, Number(value)));
        }
        if(print){
            let value = print[1]
            if(print[2]){
                value = print[2]
            }
            let printValue = this.replaceVariablesInPrint(value, variables);
            printValue = await this.evaluateExpression(printValue);
            printValue = this.cleanPrintValue(printValue)
            this.codeService.setPrint(printValue);
        }

        if(isReturn){
            let values = isReturn[1].split(',').map((value: string) => value.trim());
            if(values){
                for (let i = 0; i < values.length; i++) {
                    let value = await this.applyFunctions(values[i], variables)
                    values[i] = evaluate(value);
                }
                this.context.setReturnValue(values);
            }
        }
        this.variablesService.setVariables(this.context, variables);
        //  this.codeService.updateVariables(this.variables);
        return { amount: 1, finish: true };
    }
    
    async evaluateFunction(funcName: string, args: string, varName?: string): Promise<string> {
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
            case 'm             ath.round':
                var funcArgs = (args as string).split(',');
                if (funcArgs.length > 1) {
                    return Number(funcArgs[0]).toFixed(Number(funcArgs[1])).toString();
                }
                return (Math.round(Number(evalArgs))).toString();
            case 'math.asin':
                return (Math.asin(Number(evalArgs))).toString();
            case 'math.log10':
                return (Math.log10(Number(evalArgs))).toString();
            case 'input': 
                return await this.codeService.getInput(evalArgs, varName??''); 
            default:
                return evalArgs; 
        }

    }
    
    applyOperation(variableValue: number, operator: Operator, value: number): number {
        if (operator in operations) {
            return operations[operator](variableValue, value);
        } else {
            throw new Error('Operador no soportado');
        }
    }
    
    async applyFunctions(variableValue: any, variables: any, varName?: string): Promise<any>{
        let result = variableValue;
        result = replaceVariables(result, variables);
        result = await this.evaluateExpression(result, varName);
        return result;
    }
    
    
    async evaluateExpression(expression: string, varName?: string): Promise<string> {
        let previousExpression;
        let currentExpression = expression;
    
        do {
            previousExpression = currentExpression;
            currentExpression = await this.replaceAsync(currentExpression, REGEX_FUNCTIONS, async (match, funcName, args) => {
                let evaluatedArgs = await Promise.all(args.split(',').map(async (arg: string) => await this.evaluateExpression(arg.trim(), varName)));
                return await this.evaluateFunction(funcName, evaluatedArgs.join(','), varName);
            });
        } while (currentExpression !== previousExpression);
    
        return currentExpression;
    }
    
    async replaceAsync(str: string, regex: RegExp, asyncFn: (match: string, ...args: any[]) => Promise<string>): Promise<string> {
        const promises: Promise<string>[] = [];
        str.replace(regex, (match, ...args) => {
            const promise = asyncFn(match, ...args);
            promises.push(promise);
            return match;
        });
        const data = await Promise.all(promises);
        return str.replace(regex, () => data.shift()!);
    }
    
    cleanPrintValue(value: string): string {
        value = value.replace(/^[^'"]*['"]/, '');
        value = value.replace(/^"|'(.*)"|'$/, '$1');
        value = value.replace(/\\n|\n/g, '<br>');
        value = value.replace(/\\t|\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
        return value;
    }
    
    replaceVariablesInPrint(template: string, valores: { [clave: string]: string }): string {
        return Object.entries(valores).reduce((resultado, [clave, valor]) => {
            const regex = new RegExp(`\\{\\b${this.printVarRegex(clave)}\\b\\}`, 'g');
            return resultado.replace(regex, valor);
        }, template);
    }
    
    printVarRegex(string: string): string {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
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