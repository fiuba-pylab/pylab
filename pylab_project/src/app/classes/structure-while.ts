import { Structure } from "./structure";
import { evaluate, replaceOperators, replaceVariables } from "../utils";
import { CodeService } from "../services/code.service";
import { VariablesService } from "../services/variables.service";
export class WhileStructure extends Structure{
    super(){}
    currentLine: number = 0;
    setScope(code: any){
        const lines: any[] = code.split('\n');
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            
            const tabs = line.match(/^\s*/)[0].length / 4;
            if(tabs > this.level){
                this.lines.push(line);
            }

            if(tabs <= this.level || line.match(/^\n*/)[0].length == 1){
                break;
            }
        }
    }

    override async execute(amountToAdd?: number): Promise<{amount: number, finish: boolean}>{
        const variables = this.variablesService!.getVariables(this.context);
        var condition_replaced = replaceOperators(replaceVariables(this.condition, variables));
        if(this.currentLine == this.lines.length && evaluate(condition_replaced)){
            this.currentLine = 1;
            return {amount: -(this.lines.length), finish: false};
        }
        if(this.currentLine > 0 && this.currentLine < this.lines.length){
            this.currentLine += amountToAdd ?? 0;
            return {amount: 0, finish: false};
        }
        if(evaluate(condition_replaced)){
            this.currentLine++;
            return {amount: 1, finish: false};
        }
        return {amount: 0/* this.lines.length+1 */, finish: true};
    }

    override clone(codeService: CodeService | null = null, variablesService: VariablesService | null = null): Structure {
        let clone = new WhileStructure(this.level, this.condition, codeService, variablesService, this.context)
        clone.currentLine = this.currentLine;

        return clone;
    }
}