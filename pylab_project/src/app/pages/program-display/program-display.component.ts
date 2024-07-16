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
  highlightLine: number | null = 1;
  index_pointer = 0;
  lines:string[] = [
    'def programa(param):',
    '',
    '',
    ''
    /* 'le1 = len(e1)',
    'le2 = len(e2)',
    'if le1>=le2:',
    'largo = e1',
    'lmáx = le1',
    'corto = e2',
    'lmín = le2',
    'else:',
    'largo = e2',
    'lmáx = le2',
    'corto = e1',
    'lmín = le1',
    'suma = largo.copy()' */
  ];

  code_descriptions:string[] = [
    'Definición de la función programa',
    /* 'le1 = 5',
    'le2 = 6',
    'condición le1 mayor o igual le2:',
    'largo = e1',
    'lmáx = 5',
    'corto = e2',
    'lmín = 6',
    'else:',
    'largo = e2',
    'lmáx = 6',
    'corto = e1',
    'lmín = 5',
    'suma = e2' */
  ]

  text_descriptions:string[] = [
    'Definición de la función suma',
    'Asignación de variable le1',
    'Asignación de variable le2',
    'Condición entre variables le1, le2:',
    'Asignación de variable largo',
    'lmáx = 5',
    'Asignación de variable corto',
    'Asignación de variable lmín',
    'Si no se cuumple la condición',
    'Asignación de variable largo',
    'Asignación de variable lmax',
    'Asignación de variable corto',
    'Asignación de variable lmín',
    'Resultado de suma'
  ]

  next_index(){
    if(this.index_pointer < this.lines.length-1){
      this.index_pointer++;
    }
  }
  previous_index(){
    if(this.index_pointer > 0){
      this.index_pointer--;
    }
  }

  nextLine() {
    console.log("app "+this.highlightLine);
    
    if (this.highlightLine !== null) {
      this.highlightLine = this.highlightLine < 4 ? this.highlightLine + 1 : 1;
    }
  }
}
