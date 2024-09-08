import { replaceOperators, replaceVariables } from "../utils";
import { Structure } from "./structure";

export class IfStructure extends Structure{
    currentLine: number = 0;
    elseLines: any[] = [];
    hasElse: boolean = false;
    elifs: any[] = [];
    constructor(level: number, condition: string, codeService: any, variables: { [key: string]: any }) {
        super(level, condition, codeService, variables);
    }

    setScope(code: any){     
        const lines: any[] = code.split('\n');
        var elseFound: boolean = false;
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            
            const tabs = line.match(/^\s*/)[0].length / 4;
            if(tabs > this.level && !elseFound){
                this.lines.push(line);
            }else if(tabs > this.level && elseFound){
                this.elseLines.push(line);
            }

            if(isElseLine(line) && tabs == this.level){
                elseFound = true;
                this.hasElse = true;
            }else if(tabs <= this.level || line.match(/^\n*/)[0].length == 1){
                break;
            }
        }

        console.log("ESTRUCTURA IF: \n"+this.lines);
        console.log("ESTRUCTURA ELSE: \n"+this.elseLines);
    }

    override execute(amountToAdd?: number): {amount: number, finish: boolean}{
        var condition_replaced = replaceOperators(replaceVariables(this.condition, this.variables));
    
        this.currentLine += amountToAdd ?? 0;
        if(this.currentLine >= this.lines.length + this.elseLines.length){
            if(this.lines.length == 1 && this.elseLines.length == 0){
                return {amount: 0, finish: true};
            }
            return {amount: this.lines.length+this.elseLines.length+1, finish: true};
        }

        if(this.currentLine > 0 && this.currentLine < this.lines.length + this.elseLines.length){
            return {amount: 0, finish: false};
        }

       if(eval(condition_replaced)){
            this.currentLine += this.elseLines.length;
            return {amount: 1, finish: false};
        }else if(this.elseLines.length > 0){
            return {amount: this.lines.length+1, finish: false};
        } else{
            return {amount: this.lines.length+1, finish: true};
        }
    }
}


function isElseLine(line: string): boolean {
    const matchResult = line.trim().match(/else:/);
    return matchResult ? true : false;
}
