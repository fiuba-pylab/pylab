import { CodeService } from "../services/code.service";

export abstract class Structure{
    variables: { [key: string]: any } = {};
    lines: any[] = [];
    level: number; 
    condition: string;
    codeService: CodeService;
    constructor(level: number, condition: string, codeService: CodeService, variables: {}){
        this.level = level;
        this.condition = condition;
        this.codeService = codeService;
        this.variables = variables;
    }
    abstract setScope(code: any): void;

    abstract execute(amountToAdd?: number): {amount: number, finish: boolean};

    isFunction(): boolean{
        return false;
    }
}

