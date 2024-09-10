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

    private codepath:number[] = []
    private codePathIndex:number = -1
    private maxNext = -1; // se usa para ubicar el límite antes de agregar un elemento al codePath

    constructor() {}

    setLength(length: number): void {
        this.length = length;
    }

    nextLine(amount: number = 1): void {
      
        
      var highlightLine = this.behaviorSubject.value;
      if (highlightLine !== null && highlightLine < this.length) {
          this.codePathIndex ++;
          if(this.codePathIndex > this.maxNext){
            this.maxNext ++;
          }
          if(this.maxNext >= this.codepath.length){
            this.codepath.push(amount)
            highlightLine = highlightLine + amount;
          } else {
            highlightLine = highlightLine + this.codepath[this.codePathIndex];
            
          }
          
          this.behaviorSubject.next(highlightLine);
      }
     
    }

    previousLine() {
        var highlightLine = this.behaviorSubject.value;
        if (highlightLine == 1) {
          return
        }
    
        if (highlightLine !== null) {
          highlightLine = highlightLine - this.codepath[this.codePathIndex];
          if(this.codePathIndex >= 0){
            this.codePathIndex --;
          }
          
        }
        
        this.behaviorSubject.next(highlightLine);
    }
}