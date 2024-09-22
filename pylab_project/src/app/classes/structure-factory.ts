import { CodeService } from "../services/code.service";
import { VariablesService } from "../services/variables.service";
import { Context } from "./context";
import { DefStructure } from "./structure-def";
import { IfStructure } from "./structure-if";
import { NullStructure } from "./structure-null";
import { WhileStructure } from "./structure-while";
const IF = 'if';
const WHILE = 'while';
const DEF = 'def';

export class StructureFactory {
    
    static analize(code: string, level: number, codeService: CodeService, variablesService: VariablesService, context: Context){
        const first_word = code.trim().split(' ')[0]; 
        switch(first_word){
            case IF: 
                return new IfStructure(level, detectCondition(code), codeService, variablesService, context);
            case WHILE:
                return new WhileStructure(level, detectCondition(code), codeService, variablesService, context);
            case DEF:
                return new DefStructure(level, code, codeService, variablesService, context);
            default:
                return new NullStructure(level, "", codeService, variablesService, context);
        }        
    }

}

function detectCondition(code: string){
    const words = code.trim().split(' ')
    console.log("WORDS: "+words);
    
    const condition = words.slice(1, words.length).join(' ').slice(0, -1);
    console.log("CONDITION: "+condition);
    return condition
}