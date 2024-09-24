import { Inject, Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DefStructure } from '../classes/structure-def';
export const CODE_LENGTH_TOKEN = new InjectionToken<number>('codeLength');

@Injectable({
  providedIn: 'root',
})
export class CodeService {
  private length: number = 0;
  private behaviorSubjectHighlight = new BehaviorSubject<number>(1);
  // private behaviorSubjectVariables = new BehaviorSubject<{
  //   [key: string]: any;
  // }>({});
  private behaviorSubjectPrint = new BehaviorSubject<string>('');
  private behaviorSubjectFunctions = new BehaviorSubject<{
    [key: string]: DefStructure;
  }>({});
  private codePath: number[] = [];
  private codePathIndex: number = -1;
  private maxNext = -1; // se usa para ubicar el límite antes de agregar un elemento al codePath

  highlightLine = this.behaviorSubjectHighlight.asObservable();
  // variables = this.behaviorSubjectVariables.asObservable();
  print = this.behaviorSubjectPrint.asObservable();
  functions = this.behaviorSubjectFunctions.asObservable();

  constructor() {}

  setLength(length: number): void {
    this.length = length;
  }

  nextLine(amount: number): void {
    var highlightLine = this.behaviorSubjectHighlight.value;
    console.log("highlightLine", highlightLine)
    if (highlightLine !== null && highlightLine < this.length) {
      /* this.codePathIndex++;
      if (this.codePathIndex > this.maxNext) {
        this.maxNext++;
      }
      
      if (this.maxNext >= this.codePath.length) {
        this.codePath.push(amount);
        highlightLine = highlightLine + amount;
      } else {
        highlightLine = highlightLine + this.codePath[this.codePathIndex];
      } */
        console.log("highlightLine + amount", highlightLine + amount)
      this.behaviorSubjectHighlight.next(highlightLine + amount);
    }
  }

  // updateVariables(variables: any): void {
  //   this.behaviorSubjectVariables.next(variables);
  // }

  previousLine(amount?:number) {
    console.log("amount", amount)
    /* const amount = this.codePath[this.codePathIndex];
    var highlightLine = this.behaviorSubjectHighlight.value;
    if (highlightLine == 1) {
      return;
    }

    if (highlightLine !== null) {
      highlightLine = highlightLine - amount;
      if (this.codePathIndex >= 0) {
        this.codePathIndex--;
      }
    } */
      var highlightLine = this.behaviorSubjectHighlight.value
    this.behaviorSubjectHighlight.next(highlightLine - (amount?amount:0));
    return amount
  }

  setPrint(value: string): void {
    this.behaviorSubjectPrint.next(value);
  }

  setFunction(name: string, structure: DefStructure): void {
    var functions = this.behaviorSubjectFunctions.value;
    functions[name] = structure;
    this.behaviorSubjectFunctions.next(functions);
  }

  goToLine(line: number): void {
    this.behaviorSubjectHighlight.next(line);
  }
}
