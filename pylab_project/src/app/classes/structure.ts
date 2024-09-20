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

    abstract execute(amountToAdd?: number): Promise<{amount: number, finish: boolean}>;
}

