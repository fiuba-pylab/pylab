export class Program {
    id: string;
    title: string;
    description: string;
    difficulty: number;
    introduction:string;

    constructor(id: string, title: string, description: string, difficulty: number, introduction:string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.difficulty = difficulty;
        this.introduction = introduction
    }
}