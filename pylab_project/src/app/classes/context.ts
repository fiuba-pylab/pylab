export class Context{
    name: string = 'global';
    id: string = '';
    return: any | null = null;
    returnVariables: string[] = [];
    callLine: number = 0;
    constructor(id: string, funcCallLine?: number, name?: string){
        this.id = id;
        if(funcCallLine){
            this.callLine = funcCallLine;
        }
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

    getCallLine(){
        return this.callLine;
    }

    clone(): Context{
        const newContext = new Context(this.id, this.callLine, this.name);
        newContext.setReturnValue(this.return);
        newContext.setReturnVarName(this.returnVariables);
        return newContext;
    }
}