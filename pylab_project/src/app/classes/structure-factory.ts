import { IfStructure, WhileStructure, NullStructure } from "./structure";
const IF = 'if';
const WHILE = 'while';

export class StructureFactory {
    
    static analize(code: string){
        const first_word = code.split(' ')[0]

        switch(first_word){
            case IF:
                return new IfStructure();
            case WHILE:
                return new WhileStructure();
            default:
                return new NullStructure();
        }        
    }
}