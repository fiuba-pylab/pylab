import { Structure } from "./structure";

export class NullStructure extends Structure{
    super(){}

    setScope(code: any){
        console.log("ESTRUCTURA NULL: \n"+code);
    }

    execute(): void{
        this.codeService.nextLine();
    }
}