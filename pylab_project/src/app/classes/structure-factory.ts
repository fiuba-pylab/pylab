import { STRUCTURES } from "../constans";
import { CodeService } from "../services/code.service";
import { VariablesService } from "../services/variables.service";
import { Context } from "./context";
import { DefStructure } from "./structure-def";
import { IfStructure } from "./structure-if";
import { NullStructure } from "./structure-null";
import { WhileStructure } from "./structure-while";


export class StructureFactory {
    
    static analize(code: string, level: number, codeService: CodeService, variablesService: VariablesService, context: Context){
        const first_word = code.trim().split(' ')[0]; 
        switch(first_word){
            case STRUCTURES.IF: 
                return new IfStructure(level, detectCondition(code), codeService, variablesService, context);
            case STRUCTURES.WHILE:
                return new WhileStructure(level, detectCondition(code), codeService, variablesService, context);
            case STRUCTURES.DEF:
                return new DefStructure(level, code, codeService, variablesService, context);
            default:
                return new NullStructure(level, "", codeService, variablesService, context);
        }        
    }

}

function detectCondition(code: string){
    const words = code.trim().split(' ')    
    const condition = words.slice(1, words.length).join(' ').slice(0, -1);
    return condition
}