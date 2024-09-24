import { Structure } from "./structure";
import { evaluate, replaceOperators, replaceVariables } from "../utils";
export class WhileStructure extends Structure{
    super(){}
    currentLine: number = 0;
    loops = 0
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

    override executePrevious(){
        console.log("this.currentLine",this.currentLine)
        if(this.currentLine == 0){
            if(this.loops > 0){
                const amount = this.lines.length - 1
                this.currentLine += amount
                this.loops --;
                return {amount: -(amount), finish: false}
            }
            return {amount: 1, finish: true}
        } 
        this.currentLine--
        return {amount: 1, finish: false}
        
    }

    override execute(amountToAdd?: number): {amount: number, finish: boolean}{
        console.log("variables", this.variablesService.getVariables(this.context)['ultimo'].value)
        console.log("currentLine", this.currentLine)
        const variables = this.variablesService.getVariables(this.context);
        var condition_replaced = replaceOperators(replaceVariables(this.condition, variables));
        if(this.currentLine == this.lines.length && evaluate(condition_replaced)){
            this.currentLine = 1;
            this.loops ++;
            return {amount: -(this.lines.length), finish: false};
        }
        if(this.currentLine > 0 && this.currentLine < this.lines.length){
            console.log("amountToAdd", amountToAdd)
            this.currentLine += amountToAdd ?? 0;
            return {amount: 0, finish: false};
        }
        if(evaluate(condition_replaced)){
            this.currentLine++;
            return {amount: 1, finish: false};
        }
        this.currentLine = this.lines.length + 1
        return {amount:  0 , finish: true};
    }
}