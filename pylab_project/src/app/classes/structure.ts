import { CodeService } from "../services/code.service";
import { VariablesService } from "../services/variables.service";
import { Context } from "./context";

export abstract class Structure{
    lines: any[] = [];
    level: number; 
    condition: string;
    codeService: CodeService;
    variablesService: VariablesService;
    context: Context;
    constructor(level: number, condition: string, codeService: CodeService, variablesService: VariablesService, context: Context){
        this.level = level;
        this.condition = condition;
        this.codeService = codeService;
        this.variablesService = variablesService;
        this.context = context;
    }
    abstract setScope(code: any): void;

    abstract execute(amountToAdd?: number): Promise<{amount: number, finish: boolean}> | {amount: number, finish: boolean};

    isFunction(): boolean{
        return false;
    }
}

