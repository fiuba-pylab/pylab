import { Collection } from "./collection";

export class List extends Collection{

    override add(element:any){
        this.values.push(element)
    }

    override substract(element?: any): void {
        this.values.splice(this.values.indexOf(element), 1)
    }

    override access(index:string){
        return this.values[Number(index)]
    }

    override print(): string {
        return '['+this.values+']';
    }

}