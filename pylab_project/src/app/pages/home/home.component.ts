import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) { }
  cards: string[] = ['Introducción', 'Selección simple', 'Selección múltiple', 'Iteraciones','Funciones','Tuplas y listas', 'Conjuntos y diccionarios'];

  goToDisplay(){
    this.router.navigate(['/display']);
  }

}
