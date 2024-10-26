import { Collection } from "./collection";

export class Set extends Collection{
    override values:any[] | any
    constructor(){
        super()
        this.values = []
    }
    override add(element:any){
        if (!this.values.includes(element))
            this.values.push(element)
    }

    override substract(element?: any): void {
        this.values.splice(this.values.indexOf(element), 1)
    }

    override pop(): any {
        return this.values.pop()
    }


    override access(index: string): void {
        return this.values[Number(index)]
    }


    override insert(index:number, value:any){}
    
    override print(): string {
        return '('+this.values+')';

    }
}