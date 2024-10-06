import { Inject, Injectable, InjectionToken } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProgramInput } from '../pages/program-display/program-input/program-input.component';
import { BehaviorSubject, firstValueFrom, lastValueFrom, Observable, take } from 'rxjs';
import { DefStructure } from '../classes/structure-def';
import { AppState } from '../ngrx/models';
import { Store } from '@ngrx/store';
import * as actions from "../ngrx/actions";
import { Coordinator } from '../classes/coordinator';
import { selectPastStates } from '../ngrx/actions';

export const CODE_LENGTH_TOKEN = new InjectionToken<number>('codeLength');

@Injectable({
  providedIn: 'root',
})
export class CodeService {
  private length: number = 0;
  private behaviorSubjectHighlight = new BehaviorSubject<number>(1);
  private behaviorSubjectPrint = new BehaviorSubject<string>('');
  private behaviorOpenDialog = new BehaviorSubject<{
    msg: string;
    varName: string;
  }>({ msg: '', varName: '' });
  behaviorCloseDialog = new BehaviorSubject<string>('');
  private behaviorSubjectFunctions = new BehaviorSubject<{
    [key: string]: DefStructure;
  }>({});
  private codePath: number[] = [];
  private codePathIndex: number = -1;
  private maxNext = -1; // se usa para ubicar el límite antes de agregar un elemento al codePath
  dialog: MatDialog | undefined;
  inputs: any[] | undefined;
  highlightLine = this.behaviorSubjectHighlight.asObservable();
  print = this.behaviorSubjectPrint.asObservable();
  functions = this.behaviorSubjectFunctions.asObservable();

  constructor(private store: Store<AppState>) {}

  setLength(length: number): void {
    this.length = length;
  }

  getHighlightLine(): number {
    return this.behaviorSubjectHighlight.value;
  }


  nextLine(amount: number, coordinator: Coordinator) {
    var highlightLine = this.behaviorSubjectHighlight.value;
      if (highlightLine !== null && highlightLine < this.length) {
        console.log(this.codePathIndex);

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

  getStateFromPreviousLine() {
    return new Promise(async (resolve, reject) => {
      const pastStates = await firstValueFrom(this.store.select(selectPastStates));
      console.log(pastStates);
      if (pastStates.length > 0) {
        const previousState = pastStates[pastStates.length - 1];

        this.behaviorSubjectHighlight.next(previousState.highlightLine);
        this.behaviorSubjectPrint.next(previousState.print);
        this.behaviorSubjectFunctions.next(previousState.functions);
        this.codePath = [...previousState.codePath];
        this.codePathIndex = previousState.codePathIndex;
        this.maxNext = previousState.maxNext;
        this.store.dispatch(actions.goBack());

        resolve({ previousState: previousState });
        return;
      }
    });
  }

  reset() {
    this.behaviorSubjectHighlight.next(1);
    this.codePath = [];
    this.codePathIndex = -1;
    this.maxNext = -1;
  }

  setPrint(value: string): void {
    this.behaviorSubjectPrint.next(value);
  }

  async getInput(msg: string, varName: string): Promise<string> {
    this.behaviorOpenDialog.next({ msg, varName });
    let dialog = this.dialog?.open(ProgramInput, {
      data: {
        title: msg,
        options:
          this.inputs?.find((input) => input.name === varName)?.options ?? [],
      },
      disableClose: true,
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

  setFunction(name: string, structure: DefStructure): void {
    var functions = this.behaviorSubjectFunctions.value;
    functions[name] = structure;
    this.behaviorSubjectFunctions.next(functions);
  }

  goToLine(line: number, coordinator?: Coordinator): void {
    this.behaviorSubjectHighlight.next(line);
  }

  addNewState(coordinator: Coordinator): void {
    let newCoordinator = coordinator.clone();
    newCoordinator.highlightLine = this.behaviorSubjectHighlight.value;
    newCoordinator.print = this.behaviorSubjectPrint.value;
    newCoordinator.functions = { ...this.behaviorSubjectFunctions.value };
    newCoordinator.codePath = [...this.codePath];
    newCoordinator.codePathIndex = this.codePathIndex;
    newCoordinator.maxNext = this.maxNext;

    this.store.dispatch(actions.addNew({ newCoordinator }));
  }
}
