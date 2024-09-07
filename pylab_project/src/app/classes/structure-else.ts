import { Structure } from "./structure";

export class ElseStructure extends Structure{
    super(){}
    entersElse:boolean = true;
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
       if(this.entersElse){
            this.codeService.nextLine();
        }else{
            this.codeService.nextLine(this.lines.length+1);
        }     
    }
}