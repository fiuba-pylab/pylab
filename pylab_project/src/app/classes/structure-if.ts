import { Structure } from "./structure";

export class IfStructure extends Structure{
    super(){}

    entersElse = true

    setScope(code: any){     
        const lines: any[] = code.split('\n');
        
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            
            const tabs = line.match(/^\s*/)[0].length / 4;
            if(tabs >= this.level){
                this.lines.push(line);
            }

            if(tabs < this.level || line.match(/^\n*/)[0].length == 1){
                break;
            }
        }

        console.log("ESTRUCTURA IF: \n"+this.lines);
    }

    execute(): void{
        var condition_replaced = replaceOperators(replaceVariables(this.condition, this.variables));
        console.log("condition_replaced", condition_replaced)
       if(eval(condition_replaced)){
            this.entersElse = false
            this.codeService.nextLine();
        }else{
            this.codeService.nextLine(this.lines.length+1);
        }     
    }
}

function replaceVariables(template: string, valores: { [clave: string]: string }): string {
    return Object.entries(valores).reduce((resultado, [clave, valor]) => 
        resultado.replace(new RegExp(escapeRegExp(clave), 'g'), valor),
        template
    );
}

function escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function replaceOperators(template: string): string {
    return template.replace(/and/g, '&&').replace(/or/g, '||');
}