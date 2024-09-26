export abstract class Collection{
    values:any[]
    constructor(initialValues:any[]){
        this.values = initialValues
    }
    
    abstract add(element:any):void

    abstract substract(element?:any):void
}

