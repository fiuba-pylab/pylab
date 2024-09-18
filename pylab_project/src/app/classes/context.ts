export class Context{
    name: string = 'global';
    id: string = '';

    constructor(id: string, name?: string){
        this.id = id;
        if(name){
            this.name = name;
        }
    }
}