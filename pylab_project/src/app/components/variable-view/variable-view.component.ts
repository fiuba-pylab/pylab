import { Component, Input, SimpleChanges } from '@angular/core';
import { CodeService } from '../../services/code.service';

@Component({
  selector: 'app-variable-view',
  standalone: true,
  imports: [],
  templateUrl: './variable-view.component.html',
  styleUrl: './variable-view.component.css'
})
export class VariableViewComponent {
  variables: { [key: string]: any } = {};
  variableKeys: string[] = [];
  print: string = '';
  //jsPlumbInstance: any;
  constructor(private codeService: CodeService) { }

  ngOnInit(): void {
    this.codeService.variables.subscribe((value) => {
      this.variables = value;
      this.variableKeys = Object.keys(this.variables);
        //this.updateDiagram();
    });

    this.codeService.print.subscribe((value) => {
      this.print = value;
    });
  }

  // ngAfterViewInit(): void {
  //   this.jsPlumbInstance = jsPlumb.getInstance();
  //   this.jsPlumbInstance.setContainer('diagramContainer');
  // }

  // updateDiagram(): void {
  //   for (const key in this.variables) {
  //     if (this.variables.hasOwnProperty(key)) {
  //       this.createNode(key, this.variables[key]);
  //     }
  //   }
  // }

  // createNode(id: string, value: any): void {
  //   // Crear el contenedor principal del nodo
  //   const nodeDiv = document.createElement('div');
  //   nodeDiv.id = id;
  //   nodeDiv.classList.add('node'); // Agrega clase 'node' para estilos y dimensiones

  //   // Usamos Angular Material Card para estructurar el nodo
  //   nodeDiv.innerHTML = `
  //     <mat-card class="mat-elevation-z4">
  //       <mat-card-header>
  //         <mat-card-title>${id}</mat-card-title>
  //       </mat-card-header>
  //       <mat-card-content>
  //         <p>${value}</p>
  //       </mat-card-content>
  //     </mat-card>
  //   `;

  //   // Insertar el nodo en el contenedor del diagrama
  //   document.getElementById('diagram-container')?.appendChild(nodeDiv);

  //   // Registrar el nodo en jsPlumb para gestionar conexiones
  //   this.variables[id] = nodeDiv;
  // }

  // clearNodes(): void {
  //   for (const key in this.variables) {
  //     console.log("Eliminando nodo: "+key);
      
  //     if (this.variables.hasOwnProperty(key)) {
  //       const node = this.variables[key];
  //       this.jsPlumbInstance.remove(node); 
  //     }
  //   }
  //   this.variables = {};  
  // }

}
