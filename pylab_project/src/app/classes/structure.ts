import { CodeService } from "../services/code.service";

export abstract class Structure{
    variables = {}; // todo: diccionario
    lines: any[] = [];
    level: number; 
    condition: string;
    codeService: CodeService;
    category:string;
    constructor(level: number, condition: string, codeService: CodeService, variables: {}, category:string){
        this.level = level;
        this.condition = condition;
        this.codeService = codeService;
        this.variables = variables;
        this.category = category
    }
    abstract setScope(code: any): void;

    abstract execute(isPrevious:boolean): void;
}

