import { NATIVE_FUNCTIONS, REGEX_CONSTS, STRUCTURES } from "../constans";
import { evaluate, replaceVariables } from "../utils";
import { List } from "./list";
import { Structure } from "./structure";
import { Tuple } from "./tuple";

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
        if (this.lines[0].split(' ')[0] == STRUCTURES.ELIF) {
            return { amount: 0, finish: true };
        }

        const variableDeclaration = this.lines[0].match(REGEX_CONSTS.REGEX_VARIABLE_DECLARATION);
        const operations = this.lines[0].match(REGEX_CONSTS.REGEX_OPERATIONS);
        const collectionAdd = this.lines[0].match(REGEX_CONSTS.REGEX_COLLECTION_ADD);
        const collectionSubstract = this.lines[0].match(REGEX_CONSTS.REGEX_COLLECTION_SUBSTRACT);
        const print = this.lines[0].match(REGEX_CONSTS.REGEX_PRINT);
        const isReturn = this.lines[0].match(REGEX_CONSTS.REGEX_RETURN);
        if (variableDeclaration) {
           const varName = variableDeclaration[1];
           let varValue = await applyFunctions(variableDeclaration[2], variables);
           let collection = matchCollection(varValue, variables, variableDeclaration[2])
           if(!variables[varName]){
                variables[varName] = []
           }
           if(!collection){
                variables[varName].push(evaluate(varValue));
           } else {
                variables[varName] = collection
           }
           
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
            printValue = await evaluateExpression(printValue);
            printValue = cleanPrintValue(printValue)
            this.codeService.setPrint(printValue);
        }
        if(collectionAdd){
            const variable = collectionAdd[1];
            const operator = collectionAdd[2];
            const value = collectionAdd[3];
            if(operator == 'append' || operator == 'add'){
                variables[variable].add(value)
            } else if(collectionAdd[5] == '+'){
                const tupleValues = collectionAdd[6].split(', ')
                for(let tupleValue of tupleValues){
                    variables[collectionAdd[4]].add(tupleValue)
                }
            }
        }
        if(collectionSubstract){
            const variable = collectionSubstract[1];
            const operator = collectionSubstract[2];
            const value = collectionSubstract[3];
            if(operator == 'remove' || operator == 'discard'){
                variables[variable].substract(value)
            }
        }
        
        if(isReturn){
            let values = isReturn[1].split(',').map((value: string) => value.trim());
            if(values){
                for (let i = 0; i < values.length; i++) {
                    let value = await applyFunctions(values[i], variables)
                    values[i] = evaluate(value);
                }
                this.context.setReturnValue(values);
            }
        }
        this.variablesService.setVariables(this.context, variables);
        return { amount: 1, finish: true };
    }
}

function matchCollection(varValue:string, variables:any, collectionName:string){
    console.log("varValue", varValue)
    let collectionAccess;
    //se crea una lista
    if(varValue.match(REGEX_CONSTS.REGEX_LIST)){
        console.log("se crea lista")
        const values = varValue.slice(1, varValue.length -1 ).split(', ')
        return new List(values)
        //se crea un set
    } else if(varValue.match(REGEX_CONSTS.REGGEX_SET)){
        console.log("se crea set")
        const values = varValue.slice(1, varValue.length -1 ).split(', ')
        return new Set(values)
    //se crea una tupla
    } else if(varValue.match(REGEX_CONSTS.REGGEX_TUPLE)){
        console.log("se crea tupla")
        const values = varValue.slice(1, varValue.length -1 ).split(', ')
        return new Tuple(values)
    //se accede a una colecion
    } else if(collectionAccess = collectionName.match(REGEX_CONSTS.REGEX_COLLECTION_ACCESS)){
        const value = collectionAccess[1]
        const index = collectionAccess[2]
        return variables[value].values[index]
    }else {
        return null
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
        case NATIVE_FUNCTIONS.FLOAT:
            return String(Number(evalArgs));
        case NATIVE_FUNCTIONS.INT:
            return String(parseInt(evalArgs));
        case NATIVE_FUNCTIONS.LEN:
            return String((evalArgs as string).length); 
        case NATIVE_FUNCTIONS.STR:
            return String(evalArgs);
        case NATIVE_FUNCTIONS.MATH_POW:
            var funcArgs = (args as string).split(',');
            return (Math.pow(Number(funcArgs[0]), Number(funcArgs[1]))).toString();
        case NATIVE_FUNCTIONS.MATH_SQRT:
            return (Math.sqrt(Number(evalArgs))).toString();
        case NATIVE_FUNCTIONS.MATH_ROUND:
            var funcArgs = (args as string).split(',');
            if (funcArgs.length > 1) {
                return Number(funcArgs[0]).toFixed(Number(funcArgs[1])).toString();
            }
            return (Math.round(Number(evalArgs))).toString();
        case NATIVE_FUNCTIONS.MATH_ASIN:
            return (Math.asin(Number(evalArgs))).toString();
        case NATIVE_FUNCTIONS.MATH_LOG10:
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
        currentExpression = currentExpression.replace(REGEX_CONSTS.REGEX_FUNCTIONS, (match, funcName, args) => {
            let evaluatedArgs = args.split(',').map((arg: string) => evaluateExpression(arg.trim())).join(',');
            return evaluateFunction(funcName, evaluatedArgs);
        });
    } while (currentExpression !== previousExpression);

    return currentExpression;
}

function cleanPrintValue(value: string): string {
    value = value.replace(/^[^'"]*['"]/, '');
    value = value.replace(/^"|'(.*)"|'$/, '$1');
    value = value.replace(/\\n|\n/g, '<br>');
    value = value.replace(/\\t|\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
    return value;
}

function  applyOperation(variableValue: number, operator: Operator, value: number): number {
    if (operator in operations) {
        return operations[operator](variableValue, value);
    } else {
        throw new Error('Operador no soportado');
    }
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

