import { CodeService } from "../services/code.service";
import { replaceVariables } from "../utils";
import { DefStructure } from "./structure-def";
import { StructureFactory } from "./structure-factory";

export class Coordinator {
    structures: any[] = [];
    variables: { [key: string]: any } = {};
    code: string[] = [];
    codeService: CodeService;
    currentLine: number = 0;
    functions: { [key: string]: DefStructure } = {};
    funcCallLine: number = 0;
    executingFunction: boolean = false;
    constructor(codeService: CodeService, code: string) {        
        this.codeService = codeService;
        this.code = code.split('\n');
        this.codeService.variables.subscribe(async (value)=> {
            this.variables = value;
        });
        this.codeService.functions.subscribe(async (value)=> {
            this.functions = value;
        });
    }

    private analize() {
        const matchResult = this.code[this.currentLine].match(/^\s*/);
        const level = matchResult ? matchResult[0].length / 4 : 0;
        //const call = this.code[this.currentLine].match(/([a-zA-Z_][a-zA-Z0-9_]*)\s*\(([^)]*)\)/); // cambiar regex para detectar cuando hay algo asi: a = funcion_propia(param) o q busque las keys de funciones en la linea
        const call = containsFunctionName(this.code[this.currentLine], this.functions);
        if(call != null && !this.structures.includes(this.functions[call]) && !this.executingFunction){
            const params = this.code[this.currentLine].match(/\(([^)]+)\)/);
            if(params != null){
                const args = replaceVariables(params[1], this.variables).split(',').map((arg: string) => arg.trim());
                this.functions[call].setParameters(args);
            }
            this.structures.push(this.functions[call]);
            this.funcCallLine = this.currentLine;
            this.executingFunction = true;
            this.currentLine = this.functions[call].position - 1;
            return;
        }else if(this.structures.includes(this.functions[call ?? 0]) && this.executingFunction){
            return;
        }
        const structure = StructureFactory.analize(this.code[this.currentLine], level, this.codeService, this.variables);
        this.structures.push(structure);
        structure.setScope(this.code.slice(this.currentLine).join('\n')); 

    }

    execute(isPrevious: boolean = false) {
        if(isPrevious){
            this.codeService.previousLine();
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