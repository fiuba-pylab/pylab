import { Collection } from "./collection";

export class Tuple extends Collection{
    override add(element:any){
        this.values.push(element)
    }

    override substract(element?: any): void {
        
    }
}