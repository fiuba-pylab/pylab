import { CommonModule } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FileService } from '../../services/file.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
export class ProgramListComponent implements OnInit{
  // @Input() programs: any[] = [];
  programs = [
    { titulo: 'Program 1', dificultad: 2 },
    { titulo: 'Program 2', dificultad: 3 },
    { titulo: 'Program 3', dificultad: 5 }
  ];
  private type: string = "";

  constructor(private router: Router, private route: ActivatedRoute, private fileService: FileService) {}

  ngOnInit(): void {
    this.type = this.route.snapshot.paramMap.get('type') ?? "";
   // this.loadFiles()
  }

  loadFiles(): void {
    this.fileService.getFileNames(this.type)
      .subscribe(
        (files: any) => {
          this.programs = files;
        },
        (error) => {
          console.error('Error loading files:', error);
          // Handle the error here, for example:
          // - Display an error message to the user
          // - Set a loading state to 'failed'
          // - Retry the request after some delay
        }
      );
  }
  

  goToDisplay(program: string) {
    const navigationExtras: NavigationExtras = {
      state: { program: "ej2" }
    };
    this.router.navigate(['/display', this.type], navigationExtras);
  }

  verEjemplo(program: any) {
    // Lógica para manejar el clic en "Ver Ejemplo"
    console.log('Ver ejemplo de:', program);
  }
}
