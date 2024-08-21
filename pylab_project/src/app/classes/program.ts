export class Program {
    id: string;
    title: string;
    description: string;
    difficulty: number;
    introduction:string;
    inputs:Input[]

    constructor(id: string, title: string, description: string, difficulty: number, introduction:string, inputs:Input[]) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.difficulty = difficulty;
        this.introduction = introduction
        this.inputs = inputs
    }
}

class Input {
    name:string;
    options:string[];

    constructor(name:string, options:string[]){
        this.name = name;
        this.options = options;
    }
}
