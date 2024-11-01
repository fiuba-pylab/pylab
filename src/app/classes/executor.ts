import { NATIVE_FUNCTIONS, REGEX_CONSTS, VALID_OPERATORS } from "../constants";
import { CodeService } from "../services/code.service";
import { VariablesService } from "../services/variables.service";
import { evaluate, replaceVariables } from "../utils";
import { Collection } from "./collection";
import { Context } from "./context";
import { Dictionary } from "./dictionary";
import { List } from "./list";
import {Set} from "./set"
import { Tuple } from "./tuple";

const operations = {
    '+=': (a: number, b: number) => a + b,
    '-=': (a: number, b: number) => a - b,
    '*=': (a: number, b: number) => a * b,
    '//=': (a: number, b: number) => Math.floor(a / b),
    '/=': (a: number, b: number) => a / b,
};
const collectionOperations: { [key: string]: (set: Set, ...sets: Set[]) => Set } = {
    intersection: (set, ...sets) => set.intersection(...sets),
    difference: (set, ...sets) => set.difference(...sets),
    '&': (set, ...sets) => set.intersection(...sets),
    '-': (set, ...sets) => set.difference(...sets),
    '|': (set, ...sets) => set.union(...sets),
    '^': (set, ...sets) => set.symmetric_difference(...sets),
};

const collectionSetOps = {
    '-': (set: Set, values: []) => values.forEach((value: string) => set.substract(value)),
    '|': (set: Set, values: []) => values.forEach((value: string) => set.add(value)),
};

type Operator = keyof typeof operations;
type SetOperator = keyof typeof collectionSetOps;
export class Executor{
    lines:string[];
    codeService: CodeService | null;
    variablesService: VariablesService | null
    context: Context;
    variables : { [key:string]: any } 
    constructor(lines:string[], codeService:CodeService | null, variablesService: VariablesService | null, context: Context ){
        this.lines = lines
        this.codeService = codeService
        this.variablesService = variablesService
        this.context = context

        this.variables = this.variablesService!.getVariables(this.context);
    }

    async applyFunctions(variableValue: any, variables: any, varName?: string): Promise<any> {
        let result = variableValue;
        result = replaceVariables(result, variables);
        result = await this.evaluateExpression(result, varName);
        result = result.replace(/False/g, 'false').replace(/True/g, 'true')
        return result;
    }

    async evaluateFunction(funcName: string, args: string, varName?: string): Promise<string> {
        let evalArgs = evaluate(args);
        switch (funcName) {
            case NATIVE_FUNCTIONS.FLOAT:
                return String(Number(evalArgs));
            case NATIVE_FUNCTIONS.INT:
                return String(parseInt(evalArgs));
            case NATIVE_FUNCTIONS.STR:
                return String(evalArgs);
            case NATIVE_FUNCTIONS.MATH_POW:
                var funcArgs = (args as string).split(',');
                return (Math.pow(Number(funcArgs[0]), Number(funcArgs[1]))).toString();
            case NATIVE_FUNCTIONS.MATH_SQRT:
                let imaginary = false
                if (evalArgs < 0) {
                    evalArgs = evalArgs * -1;
                    imaginary = true
                }
                return ((Math.sqrt(Number(evalArgs))).toString() + (imaginary ? 'i' : ''));
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
            case NATIVE_FUNCTIONS.LEN:
                return String((evalArgs as string).length);
            case NATIVE_FUNCTIONS.INPUT:
                return await this.codeService!.getInput(evalArgs, varName ?? '');
            case NATIVE_FUNCTIONS.ABS:
                return (Math.abs(Number(evalArgs))).toString();
            default:
                return evalArgs;
        }
    }

    async matchCollection(varValue: string, variables: any, collectionName: string) {
        let collectionAccess;
        if (collectionAccess = collectionName.match(REGEX_CONSTS.REGEX_COLLECTION_ACCESS)) {
            const value = collectionAccess[1]
            const index = collectionAccess[2]
            const accessIndex = evaluate(await this.applyFunctions(index, variables))
            //caso en que se indexa un string
            if(typeof(variables[value]) == 'string'){
                return variables[value][Number(index)]
            }
            return variables[value].access(accessIndex) ? variables[value].access(accessIndex) : 'None' 
        }
        const variable = variables[varValue]
        if(variable && variable instanceof Collection){
            varValue = variable.values
        }
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
            const dictionaryElements = varValue.slice(1, varValue.length - 1).replace(/\, /g, ',').split(',');
            const dictionary = new Dictionary();
            let element;
            if(dictionaryElements[0] != ''){
                for (element of dictionaryElements) {
                    dictionary.add(element.toString());
                }
            }
            return dictionary;
        } else if (varValue.match(REGEX_CONSTS.REGGEX_SET)) {
            const values = varValue.slice(1, varValue.length - 1).replace(/\, /g, ',').split(',');
            return new Set(values);
        } else if (varValue.match(REGEX_CONSTS.REGGEX_TUPLE)) {
            const values = varValue.slice(1, varValue.length - 1).replace(/\, /g, ',').split(',');
            return new Tuple(values);
        }  else {
            return null;
        }
    }

    applyOperation(variableValue: number, operator: Operator, value: number): number {
        if (operator in operations) {
            return operations[operator](variableValue, value);
        } else {
            throw new Error('Operador no soportado');
        }
    }

    async evaluateExpression(expression: string, varName?: string): Promise<string> {
        let previousExpression;
        let currentExpression = expression;

        do {
            previousExpression = currentExpression;
            currentExpression = await this.replaceAsync(currentExpression, REGEX_CONSTS.REGEX_FUNCTIONS, async (match, funcName, args) => {
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
        value = value.replace(/["']/g, '');
        value = value.replace(/\\n|\n/g, '<br>');
        value = value.replace(/\\t|\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
        return value;
    }

    replaceVariablesInPrint(template: string, valores: { [clave: string]: any }): string {
        return Object.entries(valores).reduce((resultado, [clave, valor]) => {
            if(valor instanceof Collection){
                valor = valor.values
            }
            const regex = new RegExp(`\\{\\b${this.printVarRegex(clave)}\\b\\}`, 'g');
            return resultado.replace(regex, valor);
        }, template);
    }

    printVarRegex(string: string): string {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    async checkPrint(){
        const print = this.lines[0].match(REGEX_CONSTS.REGEX_PRINT);
        if (print) {
            let value = print[1]
            if (print[2]) {
                value = print[2]
            }
            let printValue = this.replaceVariablesInPrint(value, this.variables);
            printValue = await this.evaluateExpression(printValue);
            printValue = this.cleanPrintValue(printValue);

            const end = printValue.match(REGEX_CONSTS.REGEX_PRINT_END);
            if(end){
                printValue = printValue.replace(REGEX_CONSTS.REGEX_PRINT_END, ' ');
            }else{
                printValue = printValue + '<br>';
            }
            this.codeService!.setPrint(printValue);
        }
        this.variablesService!.setVariables(this.context, this.variables);
        return null
    }

    async checkVariableDeclaration(){
        const variableDeclaration = this.lines[0].match(REGEX_CONSTS.REGEX_VARIABLE_DECLARATION);
        if (variableDeclaration) {
            const varName = variableDeclaration[1];
            let varValue = variableDeclaration[2];
            let collectionFunctions = varValue.match(REGEX_CONSTS.REGEX_COLLECTION_LEN);
            let collectionsIn = varValue.match(REGEX_CONSTS.REGEX_IN_COLLECTIONS);
            let collectionsOperations = varValue.match(REGEX_CONSTS.REGEX_BETWEEN_SET_OPERATIONS);
            let split = varValue.match(REGEX_CONSTS.REGEX_SPLIT);
 
            if(split){
                 const variable = split[1];
                 this.variables[varName] = new List(this.variables[variable].replace(/,/g, '').replace(/'/g, '').split(' '));
                 this.variablesService!.setVariables(this.context, this.variables);
                 return { amount: 1, finish: true };
            }
            
            if(collectionFunctions){
                this.variables[varName] = this.variables[collectionFunctions[1]]?.len();
                this.variablesService!.setVariables(this.context, this.variables);
                return { amount: 1, finish: true };
            }
 
             if(collectionsIn){
                 const elemento = await this.applyFunctions(collectionsIn[1], this.variables);
                 const variable = collectionsIn[2];
                 if(this.variables[variable].in(elemento.replace(/^'|'$/g, ''))){
                    this.variables[varName] = 'True';
                 }else{
                    this.variables[varName] = 'False';
                 }
                 this.variablesService!.setVariables(this.context, this.variables);
                 return { amount: 1, finish: true };
             }
 
             if(collectionsOperations){
                 const variable = collectionsOperations[1];
                 const operation = collectionsOperations[2];
                 const values = collectionsOperations[3].split(',').map((value: string) => value.trim());
                 const sets = values.map((value: string) => this.variables[value]);
                 if (collectionOperations[operation] && this.variables[variable] && this.variables[variable] instanceof Set) {
                     this.variables[varName] = collectionOperations[operation](this.variables[variable], ...sets);
                     this.variablesService!.setVariables(this.context, this.variables);
                     return { amount: 1, finish: true };
                 }  
             }
             varValue = await this.applyFunctions(variableDeclaration[2], this.variables, varName);
             let collection = await this.matchCollection(varValue, this.variables, variableDeclaration[2]);
          
             if (!collection) {
                 this.variables[varName] = evaluate(varValue);
             } else {
                 this.variables[varName] = collection;
             }
         }
         this.variablesService!.setVariables(this.context, this.variables);
         return null
    }

    async checkCollectionSetOperations(){
        const collectionSetOperations = this.lines[0].match(REGEX_CONSTS.REGEX_SET_OPERATIONS);
        if(collectionSetOperations){
            const variable = collectionSetOperations[1];
            const operator = collectionSetOperations[2];
            const values:any = collectionSetOperations[3].trim();
            if(this.variables[variable] && this.variables[variable] instanceof Set){
                collectionSetOps[operator as SetOperator](this.variables[variable], values.split(',').map((value: string) => value.trim().replace(/^'|'$/g, '')));
            }
            this.variablesService!.setVariables(this.context, this.variables);
            return { amount: 1, finish: true };
        }
        this.variablesService!.setVariables(this.context, this.variables);
        return null
    }

    async checkOperations(){
        const operations = this.lines[0].match(REGEX_CONSTS.REGEX_OPERATIONS);
        if (operations) {
            const variable = operations[1];
            const operator:any = operations[2];
            let value = operations[3];
            value = await this.applyFunctions(value, this.variables);
            this.variables[variable] = this.applyOperation(Number(replaceVariables(variable, this.variables)), operator, Number(evaluate(value)));
        }
        this.variablesService!.setVariables(this.context, this.variables);
        return null
    }

    async checkCollectionAdd(){
        const collectionAdd = this.lines[0].match(REGEX_CONSTS.REGEX_COLLECTION_ADD);
        if (collectionAdd) {
            const variable = collectionAdd[1];
            const operator = collectionAdd[2];
            const value = collectionAdd[3];
            if (VALID_OPERATORS.validAddOperators.includes(operator)) {
                this.variables[variable].add(await this.applyFunctions(value, this.variables, variable))
            } else if (collectionAdd[5] == '+') {
                let tuple;
                let values = []
                if(tuple = this.variables[collectionAdd[6]]){
                    values = tuple.values
                } else {
                    values = collectionAdd[6].split(', ')
                }
                for (let tupleValue of values) {
                    this.variables[collectionAdd[4]].add(tupleValue)
                }
            }
        }
        this.variablesService!.setVariables(this.context, this.variables);
        return null
    }

    async checkCollectionSubstract(){
        const collectionSubstract = this.lines[0].match(REGEX_CONSTS.REGEX_COLLECTION_SUBSTRACT);
        if (collectionSubstract) {
            const variable = collectionSubstract[1];
            const operator = collectionSubstract[2];
            const value = collectionSubstract[3];
            if (VALID_OPERATORS.validSubstractOperators.includes(operator)) {
                this.variables[variable].substract(await this.applyFunctions(value, this.variables, variable))
            }
        }
        this.variablesService!.setVariables(this.context, this.variables);
        return null
    }

    async checkReturn(){
        const isReturn = this.lines[0].match(REGEX_CONSTS.REGEX_RETURN);
        if (isReturn) {
            let values = isReturn[1].split(',').map((value: string) => value.trim());
            if (values) {
                for (let i = 0; i < values.length; i++) {
                    let value = await this.applyFunctions(values[i], this.variables)
                    values[i] = evaluate(value);
                }
                this.context.setReturnValue(values);
            }
        }
        this.variablesService!.setVariables(this.context, this.variables);
        return null
    }

    async checkCollectionIndexing(){
        const collectionIndexing = this.lines[0].match(REGEX_CONSTS.INDEXING_COLLECTION)
        if(collectionIndexing){
            const collection_index = this.lines[0].split('=')[0]
            const varnName = collection_index.split('[')[0]
            let collection:Collection
            if(collection = this.variables[varnName]){
                const values = this.lines[0].split('=')[1]
                let varValue = evaluate(await this.applyFunctions(values, this.variables));
                const index_values = collection_index.split('[')[1].slice(0, -2)
                const evaluate_index = evaluate(await this.applyFunctions(index_values, this.variables))
                collection.insert(evaluate_index, varValue)
            }
        }
        this.variablesService!.setVariables(this.context, this.variables);
        return null
    }

    

}