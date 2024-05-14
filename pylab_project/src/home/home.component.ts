import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  cards: string[] = ['Introducción', 'Selecciones simples', 'Selecciones múltiples', 'Repeticiones','Funciones','Tuplas y listas','Archivos de texto', 'Conjuntos y diccionarios'];
}
