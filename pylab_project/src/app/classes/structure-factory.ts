import { CodeService } from "../services/code.service";
import { IfStructure } from "./structure-if";
import { NullStructure } from "./structure-null";
import { WhileStructure } from "./structure-while";
const IF = 'if';
const WHILE = 'while';
const ELSE = 'else';
const ELIF = 'elif';

export class StructureFactory {
    
    static analize(code: string, level: number, codeService: CodeService, variables: {}){
        const first_word = code.trim().split(' ')[0]; 
        switch(first_word){
            case IF: 
            case ELIF: 
                return new IfStructure(level, detectCondition(code), codeService, variables);
            case WHILE:
                return new WhileStructure(level, detectCondition(code), codeService, variables);
            default:
                return new NullStructure(level, "", codeService, variables);
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