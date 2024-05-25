import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-program-display',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './program-display.component.html',
  styleUrl: './program-display.component.css'
})
export class ProgramDisplayComponent {
  index_pointer = 0;
  lines:string[] = [
    'def suma(e1, e2):',
    'le1 = len(e1)',
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
    'suma = largo.copy()'
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
}
