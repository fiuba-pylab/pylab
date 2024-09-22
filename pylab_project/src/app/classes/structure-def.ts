import { REGEX_CONSTS } from "../constans";
import { VariablesService } from "../services/variables.service";
import { evaluate } from "../utils";
import { Context } from "./context";
import { Structure } from "./structure";

export class DefStructure extends Structure{
    constructor(level: number, condition: string, codeService: any, variablesService: VariablesService, context: Context) {
        super(level, condition, codeService, variablesService, context);
        this.position = codeService.behaviorSubjectHighlight.value;
        const definition = condition.match(REGEX_CONSTS.REGEX_DEF);
        if (definition != null) {
            this.parameters = definition[2].split(",").map((arg: string) => arg.trim());
            this.name = definition[1].trim();
        }
    }
    currentLine: number = -1;
    parameters: string[] = [];
    name: string = "";
    position: number = 0;
    called: boolean = false;
    myContext: any;
    setScope(code: any){
        const lines: any[] = code.split('\n');
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            
            const tabs = Math.round(line.match(/^\s*/)[0].length / 4);
            if(tabs > this.level){
                this.lines.push(line);
            }

            if(tabs <= this.level || line.match(/^\n*/)[0].length == 1){
                break;
            }
        }
        this.codeService.setFunction(this.name, this);
    }

    override execute(amountToAdd?: number): {amount: number, finish: boolean}{
        // si es la primera vez que llamo al execute, quiere decir que es cuando 
        // se declaro la funcion, entonces tengo que avanzar hasta salir del scope de la
        // funcion para que se vuelva aca solo si se llamo a la funcion en el programa
        if(this.currentLine == -1){ 
            this.currentLine++;
            return {amount: this.lines.length+1, finish: true};
        }

        // llamaron a la funcion
        if(this.currentLine == 0 && !this.called){ 
            this.called = true;
            this.codeService.goToLine(this.position);
            return {amount: 0, finish: false};
        }

        if(this.currentLine == 0 && this.called){
            this.currentLine++;
            return {amount: 1, finish: false};
        }

        this.currentLine += amountToAdd ?? 1;

        // ejecutando la función
        if(this.currentLine > 0 && this.currentLine <= this.lines.length){
            return {amount: 0, finish: false};    
        }else{ // termine de ejecutar la función
            return {amount: 1, finish: true};
        }
    }

    override isFunction(): boolean {
        return true;
    }

    setParameters(args: string[]){
        const params: any = {};
        this.parameters.forEach((param, index) => {
            params[param] = evaluate(args[index]);
        });

        this.variablesService.setVariables(this.myContext, params);
    }

    setContext(context: Context){
        this.myContext = context;
    }

    insideAFunction(): boolean {
        return (this.context.name != 'global');
    }

    clone(context: Context): DefStructure {
        const clone = new DefStructure(
            this.level,
            this.condition,
            this.codeService,       
            this.variablesService,  
            context
        );
        
        clone.currentLine = this.currentLine;
        clone.parameters = [...this.parameters];
        clone.name = this.name;
        clone.position = this.position;
        clone.called = this.called;
        
        clone.lines = [...this.lines];
        
        return clone;
    }
}