import { Collection } from "./collection";

export class Dictionary extends Collection{
    constructor(){
        super()
        this.values = {}
    }
    override add(element:string){
        console.log("elements",element)
        const components = element.split(": ")
        console.log("components", components) 
        this.values[components[0]] = components[1]
    }

    override substract(element?: any): void {
    }

    access(index:string){
        return this.values[index]
    }

    override print(): string {
        const cleanedValues = Object.fromEntries(
          Object.entries(this.values).map(([key, value]) => [
            key.replace(/^"|"$/g, ''),  
            (value as string).replace(/^"|"$/g, '') 
          ])
        );
        return JSON.stringify(cleanedValues);
    }
      
}