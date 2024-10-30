import { Collection } from "./collection";

export class Dictionary extends Collection{
    constructor(){
        super();
        this.values = {};
    }
    
    override add(element:string){
        const components = element.split(": ")
        this.values[components[0].replace(/^'|'$/g, '')] = components[1]
    }

    override substract(element?: any): void {
    }

    access(index:string){
        return this.values[index]
    }

    override insert(index:string, value:any){
        this.values[index.replace(/^'|'$/g, '')] = value
    }

    override print(): string {
        const cleanedValues = Object.fromEntries(
          Object.entries(this.values).map(([key, value]) => [
            String(key).replace(/^"|"$/g, ''),  
            String(value).replace(/^"|"$/g, '') 
          ])
        );
        return JSON.stringify(cleanedValues);
    }    

    override in(element:any): boolean{
        return element in this.values;
    }
      
}