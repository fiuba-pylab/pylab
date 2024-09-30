export abstract class Collection{
    values:any[] | any
    constructor(initialValues?:any[] | any){
        this.values = initialValues
    }
    
    abstract add(element:any):void

    abstract substract(element?:any):void

    abstract access(index:string):void
}

