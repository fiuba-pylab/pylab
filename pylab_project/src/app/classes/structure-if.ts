import { evaluate, replaceOperators, replaceVariables } from "../utils";
import { Structure } from "./structure";

export class IfStructure extends Structure{
    currentLine: number = 0;
    elseLines: any[] = [];
    checkElse: boolean = false;
    elifs: { condition: string, lines: any[] }[] = [];
    checkElifs: boolean = false;
    enterElif: boolean = false;
    elifIndex: number = 0;
    hasElse: boolean = false;
    constructor(level: number, condition: string, codeService: any, variables: { [key: string]: any }) {
        super(level, condition, codeService, variables);
    }

    setScope(code: any){     
        const lines: any[] = code.split('\n');
        var elseFound: boolean = false;
        var currentElif: { condition: string, lines: any[] } | null = null;

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            
            const tabs = line.match(/^\s*/)[0].length / 4;

            if (tabs > this.level && !elseFound && !currentElif) {
                this.lines.push(line);
            } else if (tabs > this.level && elseFound) {
                this.elseLines.push(line);
            } else if (tabs > this.level && currentElif) {
                currentElif.lines.push(line);
            }

            if (isElseLine(line) && tabs === this.level) {
                elseFound = true;
                this.hasElse = true;
            } else if (isElifLine(line) && tabs === this.level) {
                const elifCondition = line.trim().replace("elif", "").replace(":", "").trim();
                currentElif = { condition: elifCondition, lines: [] };
                this.elifs.push(currentElif);
            } else if (tabs <= this.level || line.match(/^\n*/)[0].length === 1) {
                break;
            }
        }
    }

    override execute(amountToAdd?: number): {amount: number, finish: boolean}{
        var condition_replaced = replaceOperators(replaceVariables(this.condition, this.variables));
        if(this.checkElifs && !this.enterElif && this.elifIndex < this.elifs.length){
            const elif = this.elifs[this.elifIndex];
            condition_replaced = replaceOperators(replaceVariables(elif.condition, this.variables));
            if(evaluate(condition_replaced)){
                this.enterElif = true;
                this.currentLine += 1;
                return {amount: 1, finish: false};
            }else{
                this.currentLine += this.elifs[this.elifIndex].lines.length + 1;
                this.elifIndex += 1;
                if(this.elifIndex <= this.elifs.length){
                    return {amount: this.elifs[this.elifIndex-1].lines.length + 1, finish: false};
                }
            }
        }
    
        this.currentLine += amountToAdd ?? 0;

        if(this.checkElifs){
            var totalLength = 0;
            for (let index = 0; index < this.elifIndex; index++) {
                totalLength += (this.elifs[index].lines.length + 1);
            }
            if(this.currentLine > totalLength + this.lines.length && this.currentLine <= this.lines.length + totalLength + this.elifs[this.elifIndex].lines.length + 1){
                return {amount: 0, finish: false};
            }else if(this.currentLine > this.lines.length + totalLength + this.elifs[this.elifIndex].lines.length){ // termine de ejecutar elif que estaba
                // sumar las length de todas las líneas de los elifs desde el indice
                var length = 0;
                for (let index = this.elifIndex+1; index < this.elifs.length; index++) {
                    length += this.elifs[index].lines.length + 1;
                }
                length += this.elseLines.length + 1;
                return {amount: length + 1, finish: true};
            }
        }


        // Se cumplió la condición del if y ya ejecuté todo lo de adentro
        if(this.currentLine > this.lines.length && !this.checkElse){
            if(this.elifs.length > 0){
                var cantLines = this.elseLines.length+1;
                for(let i = 0; i < this.elifs.length; i++){
                    cantLines += this.elifs[i].lines.length + 1;
                }
                return {amount: cantLines, finish: true};
            }else if(this.elseLines.length > 0){
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

     
       if(evaluate(condition_replaced)){ // Se cumple la condición del if
            this.currentLine += 1;
            return {amount: 1, finish: false};
        }else if(this.elifs.length > 0){ // No se cumplió la condición del if y hay elifs
            this.checkElifs = true;
            this.currentLine += this.lines.length+1;
            return {amount: this.lines.length+1, finish: false};
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

function isElifLine(line: string): boolean {
    const matchResult = line.trim().match(/elif/);
    return matchResult ? true : false;
}
