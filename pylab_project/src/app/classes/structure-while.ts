import { Structure } from "./structure";

export class WhileStructure extends Structure{
    super(){}

    setScope(code: any){
        console.log("while lines en setScope: "+code);
    }

    execute(): void{
        this.codeService.nextLine();
    }
}