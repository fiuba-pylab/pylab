import { Structure } from "./structure";
import { evaluate, replaceOperators, replaceVariables } from "../utils";
import { REGEX_CONSTS } from "../constans";
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
        const variables = this.variablesService.getVariables(this.context);
        var condition_replaced = replaceOperators(replaceVariables(this.condition, variables));
        const collectionIteration = this.condition.match(REGEX_CONSTS.REGEX_FOR);
        if(collectionIteration){
            const varName = this.condition.split(' ')[2]
            const collection = variables[varName]
            const numberValuesCollection = collection.values.length
            this.condition = 'ForIteratorVariable > 0'
            variables['ForIteratorVariable'] = numberValuesCollection
            
        }
        
        if(this.currentLine == this.lines.length){
            this.currentLine = 0;
            return {amount: -(this.lines.length+1), finish: true};
        }
        if(this.currentLine > 0 && this.currentLine < this.lines.length){
            this.currentLine += amountToAdd ?? 0;
            return {amount: 0, finish: false};
        }
        if(evaluate(condition_replaced)){
            this.currentLine++;
            return {amount: 1, finish: false};
        }
        return {amount: this.lines.length+1, finish: true};
    }
}