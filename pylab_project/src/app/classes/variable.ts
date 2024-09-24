export abstract class Variable{
    value:string | number
    constructor( initialValue:string | number){
        this.value = initialValue
    }   

    abstract setValue(value:string  | number):void

    abstract setPrevious():void

}