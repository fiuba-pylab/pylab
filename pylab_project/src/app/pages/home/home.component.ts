import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { SvgComponent } from '../../components/svg/svg.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, SvgComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) { }
  cards: any[] = [
    {titulo: 'Introducción', imagen: 'introduccion.png'},
    {titulo: 'Selección simple', imagen: 'seleccion_simple1.png'},
    {titulo: 'Selección múltiple', imagen: 'seleccion_multiple1.png'},
    {titulo: 'Iteraciones', imagen: 'iteraciones.png'},
    {titulo: 'Funciones', imagen: 'funciones.png'},
    {titulo: 'Tuplas y listas', imagen: 'tuplas_listas.png'},
    {titulo: 'Conjuntos y diccionarios', imagen: 'conjuntos_diccionarios.png'},
  ]

  listPrograms(){
    this.router.navigate(['/list']);
  }

}
