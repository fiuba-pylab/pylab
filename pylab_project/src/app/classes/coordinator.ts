import { REGEX_CONSTS } from "../constants";
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

            const func = this.functions[call].clone(this.contexts[this.contexts.length-1]);
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

    async execute(isPrevious: boolean = false) {
        console.log("structures", this.structures)
        if(isPrevious){
            const prevAmount = this.codeService.previousLine();
            if(prevAmount){
                this.currentLine -= prevAmount;
                const currentLine = this.code[this.currentLine].trim()
                /* if(currentLine.split(' ')[0] == 'if'){ */
                    this.structures.pop();
                // /* } */
                const varName = currentLine.split(' ')[0];
                const variables = this.variablesService.getVariables(this.contexts[this.contexts.length - 1]);
                if(variables[currentLine.split(' ')[0]]){
                    variables[currentLine.split(' ')[0]].pop()
                    this.variablesService.setVariables(this.contexts[this.contexts.length - 1], variables);
                    // esto no funciona, lo acomode asi para que use el variable service pero hay q revisar
                }
                
            }
            return
        }
        let prevAmount = 0;
        let lastStructure = null;
        this.analize();
        for (let i = this.structures.length - 1; i >= 0; i--){
            const structure : Structure = this.structures[i];
            const result = await structure.execute(prevAmount);
            if (result.finish && structure == this.structures[this.structures.length - 1]) {
                lastStructure = this.structures.pop();
                if(this.executingFunction && structure.isFunction()){
                    const lastContext = this.contexts.pop();
                    this.codeService.goToLine(lastContext!.getCallLine() + 1);
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
            if(lastStructure && lastStructure.isFunction()){
                prevAmount = 1;
                lastStructure = null;
            }else{
                prevAmount += result.amount;
            }
            this.currentLine += result.amount;
            this.codeService.nextLine(result.amount);

            if (structure.isFunction() && !result.finish) {
                break;
            }
        }
    }

    reset(){
        this.structures = [];
        this.currentLine = 0;
        this.executingFunction = false;
        this.contexts = this.contexts.slice(0, 1);
        this.variablesService.reset();
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

