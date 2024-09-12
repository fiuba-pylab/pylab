import { Structure } from "./structure";

const operations = {
    '+=': (a: number, b: number) => a + b,
    '-=': (a: number, b: number) => a - b,
    '*=': (a: number, b: number) => a * b,
    '/=': (a: number, b: number) => a / b,
};

type Operator = keyof typeof operations;
export class NullStructure extends Structure{
    super(){}

    setScope(code: any){
        const lines: any[] = code.split('\n');
        this.lines.push(lines[0]); 
    }

    override execute(): {amount: number, finish: boolean}{
        this.lines[0] = this.lines[0].trim();
        if(this.lines[0].split(' ')[0] == 'elif'){
            return {amount: 0, finish: true};
        }
        const variableDeclaration = this.lines[0].match(/(\w+)\s*=\s*(.+)/);
        const operations = this.lines[0].match(/(\w+)\s*(\+=|-=|\*=|\/=)\s*(.+)/)
        if (variableDeclaration) {
           const varName = variableDeclaration[1];
           const varValue = variableDeclaration[2];
           if(!this.variables[varName]){
            this.variables[varName] = []
           }
           this.variables[varName].push(varValue);
        }
        if (operations) {
            const variable = operations[1];
            const operator = operations[2];
            const value = operations[3];
            this.variables[variable].push(applyOperation(Number(this.variables[variable][this.variables[variable].length -1]), operator, Number(value)));
        }
       
        this.codeService.updateVariables(this.variables);
        return {amount: 1, finish: true};
    }
}

function applyOperation(variableValue: number, operator: Operator, value: number): number {
    if (operator in operations) {
        return operations[operator](variableValue, value);
    } else {
        throw new Error('Operador no soportado');
    }
}