export class Context{
    name: string = 'global';
    id: string = '';
    return: any | null = null;
    returnVariables: string[] = [];
    constructor(id: string, name?: string){
        this.id = id;
        if(name){
            this.name = name;
        }
    }

    setReturnValue(value: any){
        this.return = value;
    }

    setReturnVarName(variable: string[]){
        this.returnVariables = variable;
    }

    getReturnValue(){
        return {names: this.returnVariables, values: this.return};
    }
}