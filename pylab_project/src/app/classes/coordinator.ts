import { REGEX_CONSTS } from "../constans";
import { CodeService } from "../services/code.service";
import { Structure } from "./structure";
import { VariablesService } from "../services/variables.service";
import { evaluate, replaceVariables } from "../utils";
import { Context } from "./context";
import { DefStructure } from "./structure-def";
import { StructureFactory } from "./structure-factory";
import { v4 as uuidv4 } from 'uuid';

export class Coordinator {
    structures: any[] = [];
    code: string[] = [];
    codeService: CodeService;
    currentLine: number = 0;
    functions: { [key: string]: DefStructure } = {};
    executingFunction: boolean = false;
    contexts: Context[] = [new Context(uuidv4())];
    variablesService: any;
    constructor(codeService: CodeService, code: string, variablesService: VariablesService) {
        this.variablesService = variablesService;        
        this.codeService = codeService;
        this.code = code.split('\n');
        this.codeService.functions.subscribe(async (value: { [key: string]: DefStructure; })=> {
            this.functions = value;
        });
        this.codeService.goForwardOrAddNew(this);
    }

    private analize() {
        const matchResult = this.code[this.currentLine].match(/^\s*/);
        const level = matchResult ? matchResult[0].length / 4 : 0;
        //const call = this.code[this.currentLine].match(/([a-zA-Z_][a-zA-Z0-9_]*)\s*\(([^)]*)\)/); // cambiar regex para detectar cuando hay algo asi: a = funcion_propia(param) o q busque las keys de funciones en la linea
        const call = containsFunctionName(this.code[this.currentLine], this.functions);
        if(call != null){
            const context = new Context(uuidv4(), this.currentLine, call);
            if(this.code[this.currentLine].includes('def')){
                return;
            }
            const returnVar = this.code[this.currentLine].match(REGEX_CONSTS.REGEX_RETURN_VARIABLES);
            if (returnVar != null) {
                const varNames = returnVar[1].split(',').map((name: string) => name.trim());
                context.setReturnVarName(varNames);
            }   

            const func = this.functions[call].deepClone(this.contexts[this.contexts.length-1]);
            func.setContext(context);
            const params = this.code[this.currentLine].match(/\(([^)]+)\)/);
            if(params != null){
                const args = evaluate(replaceVariables(params[1], this.variablesService.getVariables(this.contexts[this.contexts.length-1])).split(',').map((arg: string) => arg.trim()));
                func.setParameters(args);
                // TODO: ver parametros por nombre
            }
            this.contexts.push(context);
            this.structures.push(func);
            this.executingFunction = true;
            this.currentLine = this.functions[call].position - 1;
            return;
        }

        const structure = StructureFactory.analize(this.code[this.currentLine], level, this.codeService, this.variablesService, this.contexts[this.contexts.length - 1]);
        this.structures.push(structure);
        structure.setScope(this.code.slice(this.currentLine).join('\n')); 
    }

    async executePrevious() {
        await this.codeService.previousLine().then((response: any) => {
            console.log("response", response);
            if (response.previousState){
                this.currentLine = response.previousState.currentLine;
                this.structures = response.previousState.structures;
                this.functions = response.previousState.functions;
                this.contexts = response.previousState.contexts;
                this.executingFunction = response.previousState.executingFunction;
                return;
            } 
        });
    }

    async executeForward() {
        console.log("structures", this.structures)
        let prevAmount = 0;
        let lastStructure = null;
        const response: any = await this.codeService.getFutureState();
        if (response && response.state) {
            const futureState = response.state;
            this.currentLine = futureState.currentLine;
            this.structures = [...futureState.structures];
            this.functions = futureState.functions;
            this.contexts = [...futureState.contexts];
            this.executingFunction = futureState.executingFunction;
            return;
        }
        this.analize();
        for (let i = this.structures.length - 1; i >= 0; i--){
            const structure : Structure = this.structures[i];
            const result = await structure.execute(prevAmount);
            if (result.finish) {
                lastStructure = this.structures.pop();
                if(this.executingFunction && structure.isFunction()){
                    const lastContext = this.contexts.pop();
                    this.codeService.goToLine(lastContext!.getCallLine() + 1, this);
                    this.currentLine = lastContext!.getCallLine();
                    const variables = this.variablesService.getVariables(this.contexts[this.contexts.length - 1]);
                    const returnVar = lastContext?.getReturnValue();
                    if(returnVar){
                        for(let i = 0; i < returnVar.names.length; i++){
                            variables[returnVar.names[i]] = returnVar.values[i];
                        }
                    }
                    this.variablesService.deleteContext(lastContext);
                    this.variablesService.setVariables(variables);
                }
            }
            if(lastStructure && lastStructure.isFunction() && lastStructure.insideAFunction()){
                prevAmount = 1;
                lastStructure = null;
            }else{
                prevAmount += result.amount;
            }
            this.currentLine += result.amount;
            this.codeService.nextLine(result.amount, this);

            if (structure.isFunction() && !result.finish) {
                break;
            }
        }
        this.codeService.goForwardOrAddNew(this);
    }

    clone() {
        const newCoordinator:any = {}
        newCoordinator.currentLine = this.currentLine;
        newCoordinator.structures = this.structures.map(structure => structure.clone());
        //newCoordinator.functions = { ...this.functions }; 
        let clonedFunctions: { [key: string]: DefStructure } = {};
        for (const key in this.functions) {
            if (this.functions.hasOwnProperty(key)) {
              clonedFunctions[key] = this.functions[key].clone();
            }
          }
        newCoordinator.functions = clonedFunctions;
        newCoordinator.contexts = this.contexts.map(context => context.clone());
        newCoordinator.executingFunction = this.executingFunction;
        return newCoordinator;
    }
}

function containsFunctionName(str: string, dict: {[key: string]: any}): string | null{
    for (let key in dict) {
        if (str.includes(key+'(')) {
            return key; 
        }
    }
    return null;
}

