import { replaceOperators, replaceVariables } from "../utils";
import { Structure } from "./structure";

export class IfStructure extends Structure{
    currentLine: number = 0;
    elseLines: any[] = [];
    checkElse: boolean = false;
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

        // Se cumplió la condición del if y ya ejecuté todo lo de adentro
        if(this.currentLine > this.lines.length && !this.checkElse){
            if(this.elseLines.length > 0){
                return {amount: this.elseLines.length+1, finish: true};
            }else{
                return {amount: 0, finish: true};
            }
        }

        // No se cumplió la condición del if y ya ejecuté todo lo de adentro del else
        if(this.currentLine > this.lines.length + this.elseLines.length && this.checkElse){
            return {amount: 0, finish: true};
        }

        // Estoy ejecutando lo de adentro del if
        if(this.currentLine > 0 && this.currentLine <= this.lines.length && !this.checkElse){
            return {amount: 0, finish: false};
        }

        // Estoy ejecutando lo de adentro del else
        if(this.currentLine > this.lines.length+1 && this.currentLine <= this.lines.length + this.elseLines.length && this.checkElse){
            return {amount: 0, finish: false};
        }

     
       if(eval(condition_replaced)){ // Se cumple la condición del if
            this.currentLine += 1;
            return {amount: 1, finish: false};
        }else if(this.elseLines.length > 0){ // No se cumple la condición del if y hay else
            this.checkElse = true;
            this.currentLine += this.lines.length+1;
            return {amount: this.lines.length+1, finish: false};
        } else{ // No se cumple la condición del if y no hay else, se termina el if
            return {amount: this.lines.length+1, finish: true};
        }
    }
}


function isElseLine(line: string): boolean {
    const matchResult = line.trim().match(/else:/);
    return matchResult ? true : false;
}
