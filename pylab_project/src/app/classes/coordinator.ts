import { CodeService } from "../services/code.service";
import { VariablesService } from "../services/variables.service";
import { replaceVariables } from "../utils";
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
    funcCallLine: number = 0;
    executingFunction: boolean = false;
    contexts: Context[] = [new Context(uuidv4())];
    variablesService: any;
    constructor(codeService: CodeService, code: string, variablesService: VariablesService) {
        this.variablesService = variablesService;        
        this.codeService = codeService;
        this.code = code.split('\n');
        this.codeService.functions.subscribe(async (value)=> {
            this.functions = value;
        });
    }

    private analize() {
        const matchResult = this.code[this.currentLine].match(/^\s*/);
        const level = matchResult ? matchResult[0].length / 4 : 0;
        //const call = this.code[this.currentLine].match(/([a-zA-Z_][a-zA-Z0-9_]*)\s*\(([^)]*)\)/); // cambiar regex para detectar cuando hay algo asi: a = funcion_propia(param) o q busque las keys de funciones en la linea
        const call = containsFunctionName(this.code[this.currentLine], this.functions);
        if(call != null){
            if(this.code[this.currentLine].includes('def')){
                return;
            }
            const params = this.code[this.currentLine].match(/\(([^)]+)\)/);
            if(params != null){
                const args = replaceVariables(params[1], this.variablesService.getVariables(this.contexts[this.contexts.length-1])).split(',').map((arg: string) => arg.trim());
                this.contexts.push(new Context(uuidv4(), call));
                this.functions[call].setContext(this.contexts[this.contexts.length - 1]);
                this.functions[call].setParameters(args);
                // TODO: ver parametros por nombre
            }
            this.structures.push(this.functions[call]);
            this.funcCallLine = this.currentLine;
            this.executingFunction = true;
            this.currentLine = this.functions[call].position - 1;
            return;
        }

        const structure = StructureFactory.analize(this.code[this.currentLine], level, this.codeService, this.variablesService, this.contexts[this.contexts.length - 1]);
        this.structures.push(structure);
        structure.setScope(this.code.slice(this.currentLine).join('\n')); 
    }

    execute(isPrevious: boolean = false) {
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
        this.analize();
        for (let i = this.structures.length - 1; i >= 0; i--){
            const structure = this.structures[i];
            const result = structure.execute(prevAmount);
            if (result.finish) {
                this.structures.pop();
                if(this.executingFunction && structure.isFunction()){
                    this.executingFunction = false;
                    this.codeService.goToLine(this.funcCallLine + 1);
                    this.currentLine = this.funcCallLine;
                    this.contexts.pop();
                }
            }
            prevAmount += result.amount;
            this.currentLine += result.amount;
            this.codeService.nextLine(result.amount);

            if (this.executingFunction && structure.isFunction() && !result.finish) { // revisar xq capaz el executingFunction es al pedo
                break;
            }
        }
    }
}

function containsFunctionName(str: string, dict: {[key: string]: any}): string | null{
    for (let key in dict) {
        if (str.includes(key)) {
            return key; 
        }
    }
    return null;
}

