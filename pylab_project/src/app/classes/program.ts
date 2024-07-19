export class Program {
    id: string;
    title: string;
    description: string;
    difficulty: number;

    constructor(id: string, title: string, description: string, difficulty: number) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.difficulty = difficulty;
    }
}