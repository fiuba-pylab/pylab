import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { SvgComponent } from '../../components/svg/svg.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { updateVariable, undoAction, redoAction } from '../../ngrx/actions';
import { AppState } from '../../ngrx/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, SvgComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  variable$: Observable<{ past: string[]; present: string; future: string[] }>;
  constructor(private router: Router, private store: Store<AppState>) {
    this.variable$ = this.store.select(state => state.variable);
  }
  cards: any[] = [
    {titulo: 'Introducción', imagen: 'introduccion.png', tipo: 'introduccion'},
    {titulo: 'Selección simple', imagen: 'seleccion_simple1.png', tipo: 'seleccion-simple'},
    {titulo: 'Selección múltiple', imagen: 'seleccion_multiple1.png', tipo: 'seleccion-multiple'},
    {titulo: 'Iteraciones', imagen: 'iteraciones.png', tipo: 'iteraciones'},
    {titulo: 'Funciones', imagen: 'funciones.png', tipo: 'funciones'},
    {titulo: 'Tuplas y listas', imagen: 'tuplas_listas.png', tipo: 'tuplas-listas'},
    {titulo: 'Conjuntos y diccionarios', imagen: 'conjuntos_diccionarios.png', tipo: 'conjuntos-diccionarios'},
  ]

  listPrograms(tipo: string){
    this.router.navigate(['/list', tipo]);
  }

  updateVariable(newVariable: string) {
    console.log('updating variable', newVariable);
    
    this.store.dispatch(updateVariable({ variable: newVariable }));
  }

  undo() {
    this.store.dispatch(undoAction());
  }

  redo() {
    this.store.dispatch(redoAction());
  }

}
