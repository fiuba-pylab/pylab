import { Inject, Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
export const CODE_LENGTH_TOKEN = new InjectionToken<number>('codeLength');

@Injectable({
  providedIn: 'root',
})
export class CodeService {
    private length: number = 0;
    private behaviorSubjectHighlight = new BehaviorSubject<number>(1);
    private behaviorSubjectVariables = new BehaviorSubject<{ [key: string]: any }>({});
  
    highlightLine = this.behaviorSubjectHighlight.asObservable();
    variables = this.behaviorSubjectVariables.asObservable();

    constructor() {}

    setLength(length: number): void {
        this.length = length;
    }

    nextLine(amount: number): void {
      var highlightLine = this.behaviorSubjectHighlight.value;
      
      if (highlightLine !== null && highlightLine < this.length) {
        highlightLine = highlightLine + amount;
      }
      this.behaviorSubjectHighlight.next(highlightLine);
    }

    updateVariables(variables: any): void {
      this.behaviorSubjectVariables.next(variables);
    }

    previousLine() {
        var highlightLine = this.behaviorSubjectHighlight.value;
        if (highlightLine == 1) {
          return
        }
    
        if (highlightLine !== null) {
          highlightLine = highlightLine - 1;
        }

        this.behaviorSubjectHighlight.next(highlightLine);
    }
}