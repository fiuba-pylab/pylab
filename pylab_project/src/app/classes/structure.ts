import { CodeService } from "../services/code.service";
import { Coordinator } from "./coordinator";

export abstract class Structure{
    variables: { [key: string]: any } = {};
    lines: any[] = [];
    level: number; 
    condition: string;
    codeService: CodeService;
    coordinator: any;
    constructor(level: number, condition: string, codeService: CodeService, variables: {}){
        this.level = level;
        this.condition = condition;
        this.codeService = codeService;
        this.variables = variables;
    }
    abstract setScope(code: any): void;

    execute(amountToAdd?: number): {amount: number, finish: boolean}{
        return { amount: 1, finish: true };
    }
}

