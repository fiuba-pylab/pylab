import { CodeService } from "../services/code.service";
import { VariablesService } from "../services/variables.service";
import { Context } from "./context";

export abstract class Structure{
    lines: any[] = [];
    level: number; 
    condition: string;
    codeService: CodeService | null;
    variablesService: VariablesService | null;
    context: Context;
    constructor(level: number, condition: string, codeService: CodeService | null, variablesService: VariablesService | null, context: Context){
        this.level = level;
        this.condition = condition;
        this.codeService = codeService;
        this.variablesService = variablesService;
        this.context = context;
    }
    abstract setScope(code: any): void;

    abstract execute(amountToAdd?: number): Promise<{amount: number, finish: boolean}>;

    abstract clone(codeService: CodeService | null, variablesService: VariablesService | null): Structure;

    isFunction(): boolean{
        return false;
    }

}

