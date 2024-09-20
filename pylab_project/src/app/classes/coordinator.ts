import { CodeService } from "../services/code.service";
import { Structure } from "./structure";
import { StructureFactory } from "./structure-factory";

export class Coordinator {
    structures: any[] = [];
    variables: { [key: string]: any } = {};
    code: string[] = [];
    codeService: CodeService;
    currentLine: number = 0;
    constructor(codeService: CodeService, code: string, variables: any|null  = {}) {        
        this.codeService = codeService;
        this.code = code.split('\n');
        this.codeService.variables.subscribe(async (value)=> {
            this.variables = value;
        });
    }

    private analize() {
        const matchResult = this.code[this.currentLine].match(/^\s*/);
        const level = matchResult ? matchResult[0].length / 4 : 0;
        const structure = StructureFactory.analize(this.code[this.currentLine], level, this.codeService, this.variables);
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
                /* } */
                if(this.variables[currentLine.split(' ')[0]]){
                    this.variables[currentLine.split(' ')[0]].pop()
                    this.codeService.updateVariables(this.variables)
                }
                
            }
            return
        }
        let prevAmount = 0;
        this.analize();
        for (let i = this.structures.length - 1; i >= 0; i--){
            const structure : Structure = this.structures[i];
            const result = await structure.execute(prevAmount);
            if (result.finish) {
                this.structures.pop();
            }
            prevAmount += result.amount;
            this.currentLine += result.amount;
            if(result.amount != 0)
                this.codeService.nextLine(result.amount);
        }
    }
}