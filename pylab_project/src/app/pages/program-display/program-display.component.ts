import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { CodeViewComponent } from '../../components/code-view/code-view.component';

@Component({
  selector: 'app-program-display',
  standalone: true,
  imports: [CommonModule, MatIconModule, CodeViewComponent],
  templateUrl: './program-display.component.html',
  styleUrl: './program-display.component.css'
})
export class ProgramDisplayComponent {
  code: string = `function x() {
  console.log("Hello world!");
  console.log("Another line");
  console.log("Yet another line");
}`;
  highlightLine: number = 1;

  nextLine() {
    if (this.highlightLine !== null ) { // TODO: agregar condicion que sea menor a la cantidad de lineas del codigo q tenemos
      this.highlightLine = this.highlightLine + 1;
    }else{
      this.highlightLine = 1;
    }
  }

  previousLine(){
    if(this.highlightLine == 1){
      return
    }
    
    if(this.highlightLine !== null){
      this.highlightLine = this.highlightLine - 1;
    }
  }
}
