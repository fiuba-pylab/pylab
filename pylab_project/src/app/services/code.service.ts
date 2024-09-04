import { Inject, Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
export const CODE_LENGTH_TOKEN = new InjectionToken<number>('codeLength');

@Injectable({
  providedIn: 'root',
})
export class CodeService {
    private length: number = 0;
    behaviorSubject = new BehaviorSubject(1);
    highlightLine = this.behaviorSubject.asObservable();

    constructor() {}

    setLength(length: number): void {
        this.length = length;
    }

    nextLine(amount: number = 1): void {
        var highlightLine = this.behaviorSubject.value;
        if (highlightLine !== null && highlightLine < this.length) {
            highlightLine = highlightLine + amount;
        }
        this.behaviorSubject.next(highlightLine);
    }

    previousLine() {
        var highlightLine = this.behaviorSubject.value;
        if (highlightLine == 1) {
          return
        }
    
        if (highlightLine !== null) {
          highlightLine = highlightLine - 1;
        }

        this.behaviorSubject.next(highlightLine);
    }
}