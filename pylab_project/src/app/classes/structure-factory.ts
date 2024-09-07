import { CodeService } from "../services/code.service";
import { IfStructure } from "./structure-if";
import { NullStructure } from "./structure-null";
import { WhileStructure } from "./structure-while";
const IF = 'if';
const WHILE = 'while';
const ELSE = 'else:';
const ELIF = 'elif';

export class StructureFactory {
    static analize(code: string, level: number, codeService: CodeService, variables: {}){
        let index_word = 0;
        let extra_level = 0;

        while(code.charAt(index_word) == ' '){
            extra_level ++;
            index_word = index_word + 4;
        }
        
        const formatted_code = code.slice(index_word);
        const first_word = formatted_code.split(' ')[0];
       
        switch(first_word){
            case IF: 
                return new IfStructure(level + extra_level, detectCondition(formatted_code), codeService, variables, 'if');
            case ELIF: 
                return new IfStructure(level + extra_level, detectCondition(formatted_code), codeService, variables, 'elif');
            case ELSE:
                return new IfStructure(level + extra_level, detectCondition(formatted_code), codeService, variables, 'else');
            case WHILE:
                return new WhileStructure(level, detectCondition(code), codeService, variables, 'while');
            default:
                return new NullStructure(level, "", codeService, variables, '');
        }        
    }

}

function detectCondition(code: string){
    const words = code.split(' ')
    const condition = words.slice(1, words.length).join(' ').slice(0, -1);
    console.log("condicion detectCondition: "+condition)
    return condition
}