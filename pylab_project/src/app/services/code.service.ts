import { Inject, Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject, firstValueFrom, lastValueFrom, Observable, ReplaySubject, take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ProgramInput } from '../pages/program-display/program-input/program-input.component';
export const CODE_LENGTH_TOKEN = new InjectionToken<number>('codeLength');

@Injectable({
  providedIn: 'root',
})
export class CodeService {
  private length: number = 0;
  private behaviorSubjectHighlight = new BehaviorSubject<number>(1);
  private behaviorSubjectVariables = new BehaviorSubject<{
    [key: string]: any;
  }>({});
  private behaviorSubjectPrint = new BehaviorSubject<string>('');
  private behaviorOpenDialog = new BehaviorSubject<{msg: string, varName: string}>({msg: "", varName: ""});
  behaviorCloseDialog = new BehaviorSubject<string>("");
  private codePath: number[] = [];
  private codePathIndex: number = -1;
  private maxNext = -1; // se usa para ubicar el límite antes de agregar un elemento al codePath
  dialog:MatDialog | undefined; 
  inputs:any[] | undefined; 
  highlightLine = this.behaviorSubjectHighlight.asObservable();
  variables = this.behaviorSubjectVariables.asObservable();
  print = this.behaviorSubjectPrint.asObservable();

  constructor() {}

  setLength(length: number): void {
    this.length = length;
  }

  nextLine(amount: number): void {
    var highlightLine = this.behaviorSubjectHighlight.value;
    if (highlightLine !== null && highlightLine < this.length) {
      this.codePathIndex++;
      if (this.codePathIndex > this.maxNext) {
        this.maxNext++;
      }
      
      if (this.maxNext >= this.codePath.length) {
        this.codePath.push(amount);
        highlightLine = highlightLine + amount;
      } else {
        highlightLine = highlightLine + this.codePath[this.codePathIndex];
      }

      this.behaviorSubjectHighlight.next(highlightLine);
    }
  }

  updateVariables(variables: any): void {
    this.behaviorSubjectVariables.next(variables);
  }

  previousLine() {
    const amount = this.codePath[this.codePathIndex];
    var highlightLine = this.behaviorSubjectHighlight.value;
    if (highlightLine == 1) {
      return;
    }

    if (highlightLine !== null) {
      highlightLine = highlightLine - amount;
      if (this.codePathIndex >= 0) {
        this.codePathIndex--;
      }
    }
    this.behaviorSubjectHighlight.next(highlightLine);
    return amount
  }

  reset(){
    this.behaviorSubjectHighlight.next(1);
    this.behaviorSubjectVariables.next({});
    this.codePath = [];
    this.codePathIndex = -1;
    this.maxNext = -1;
  }
  
  setPrint(value: string): void {
    this.behaviorSubjectPrint.next(value);
  }

  async getInput(msg: string, varName: string): Promise<string> {
    this.behaviorOpenDialog.next({msg, varName});
    let dialog = this.dialog?.open(ProgramInput, {
      data: {
        title: msg,
        options: this.inputs?.find((input) => input.name === varName)?.options ?? [],
      },
      disableClose: true
    });
    if (dialog) {
      return lastValueFrom(dialog.afterClosed());
    }
    return Promise.reject('Dialog is undefined');
  }

  addDialog(dialog: MatDialog): void {
    this.dialog = dialog;
  }
  addInputs(inputs: any[]): void {
    this.inputs = inputs;
  }
}
