import { Structure } from "./structure";

export class DefStructure extends Structure{
    constructor(level: number, condition: string, codeService: any, variables: { [key: string]: any }) {
        super(level, condition, codeService, variables);
        this.position = codeService.behaviorSubjectHighlight.value;
        const definition = condition.match(/^def\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(([^)]*)\)/);
        if (definition != null) {
            this.parameters = definition[2].split(",").map((arg: string) => arg.trim());
            this.name = definition[1].trim();
        }
    }
    currentLine: number = 0;
    localVariables: { [key: string]: any } = {};
    parameters: string[] = [];
    name: string = "";
    position: number = 0;
    setScope(code: any){
        const lines: any[] = code.split('\n');
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            
            const tabs = line.match(/^\s*/)[0].length / 4;
            if(tabs > this.level){
                this.lines.push(line);
            }

            if(tabs <= this.level || line.match(/^\n*/)[0].length == 1){
                break;
            }
        }
        this.codeService.setFunction(this.name, this);
    }

    override execute(): {amount: number, finish: boolean}{
        // si es la primera vez que llamo al execute, quiere decir que es cuando 
        // se declaro la funcion, entonces tengo que avanzar hasta salir del scope de la
        // funcion para que se vuelva aca solo si se llamo a la funcion en el programa
        if(this.currentLine == 0){ 
            this.currentLine++;
            return {amount: this.lines.length+1, finish: true};
        }

        if(this.currentLine == 1){
            this.codeService.goToLine(this.position);
            return {amount: 0, finish: false};
        }

        if(this.currentLine == this.lines.length){
            return {amount: 1, finish: true};
        }
        return {amount: 1, finish: false};
    }
}
