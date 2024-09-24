import { Variable } from "./variable";


export class SimpleVariable extends Variable{

    previousValues:(string | number)[] = [this.value]

    override setValue(value: string | number ): void {
        this.previousValues.push(this.value)
        this.value = value;
        console.log("this.previousValues", this.previousValues)
    }

    override setPrevious(): void {
        this.previousValues.pop()
        this.value = this.previousValues[this.previousValues.length - 1]
    }
}