import { CodeService } from "../services/code.service";
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
        const call = this.code[this.currentLine].match(/([a-zA-Z_][a-zA-Z0-9_]*)\s*\(([^)]*)\)/);
        if(call != null && call[1] in this.functions){
            this.structures.push(this.functions[call[1]]);
            this.funcCallLine = this.currentLine;
            return;
        }
        console.log("VARIABLES: "+JSON.stringify(this.variables));
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
            }
            prevAmount += result.amount;
            this.currentLine += result.amount;
            this.codeService.nextLine(result.amount);
        }
    }
}