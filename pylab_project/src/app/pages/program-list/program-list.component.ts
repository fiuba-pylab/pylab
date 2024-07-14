import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-program-list',
  standalone: true,
  imports: [MatPaginatorModule, CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './program-list.component.html',
  styleUrl: './program-list.component.scss',
  animations: [
    trigger('listAnimation', [
      transition('* <=> *', [
        query(':enter',
          [style({ opacity: 0 }), stagger('60ms', animate('600ms ease-out', style({ opacity: 1 })))],
          { optional: true }
        ),
        query(':leave',
          animate('200ms', style({ opacity: 0 })),
          { optional: true}
        )
      ])
    ])
  ]
})
export class ProgramListComponent {
  //@Input() programs: any[] = [];
  programs = [
    { titulo: 'Program 1', dificultad: 2 },
    { titulo: 'Program 2', dificultad: 3 },
    { titulo: 'Program 3', dificultad: 5 }
  ];


  constructor(private router: Router) {}

  goToDisplay(){
    this.router.navigate(['/display']);
  }

  verEjemplo(program: any) {
    // Lógica para manejar el clic en "Ver Ejemplo"
    console.log('Ver ejemplo de:', program);
  }
}
