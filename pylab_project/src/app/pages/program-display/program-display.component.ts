import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CodeViewComponent } from '../../components/code-view/code-view.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from '../../services/file.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { VariableViewComponent } from '../../components/variable-view/variable-view.component';
import { Program } from '../../classes/program';

@Component({
  selector: 'app-program-display',
  standalone: true,
  imports: [CommonModule, MatIconModule, CodeViewComponent, MatSnackBarModule, VariableViewComponent],
  templateUrl: './program-display.component.html',
  styleUrl: './program-display.component.css'
})
export class ProgramDisplayComponent implements OnInit {
  code: string = "";
  highlightLine: number = 0;
  private type: string = "";
  private id: string = "";
  inputs: string = "";
  variables: any = {};

  constructor(private router: Router, private route: ActivatedRoute, private fileService: FileService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.type = this.route.snapshot.paramMap.get('type') ?? "";
    this.id = this.route.snapshot.paramMap.get('id') ?? "";
    this.inputs = history.state.inputs
    /* this.program = JSON.parse(program_string?program_string:""); */

    this.fileService.readFile(this.type, this.id).subscribe(
      (code: any) => {
        this.code = code
      },
      (error) => {
        console.error('Error loading code:', error)
        const snackbarRef = this.snackBar.open('Error loading code', 'Close', { duration: 3000, panelClass: ['red-snackbar'] });
        snackbarRef.onAction().subscribe(() => {
          this.router.navigate(['/list', this.type]);  // La ruta a la que quieres navegar
        });
      });
  }

  onVariablesChanged(newVariables: any): void {
    this.variables = newVariables;
  }

  openSnackBar(text: string, success = true) {
    const panelClass: string = success ? 'green-snackbar' : 'red-snackbar';
    this.snackBar.open(text, undefined, { duration: 3000, panelClass: [panelClass] });
  }

  nextLine() {
    if (this.highlightLine !== null && this.highlightLine < this.code.length) {
      this.highlightLine = this.highlightLine + 1;
    } else {
      this.highlightLine = 1;
    }
  }

  previousLine() {
    if (this.highlightLine == 1) {
      return
    }

    if (this.highlightLine !== null) {
      this.highlightLine = this.highlightLine - 1;
    }
  }
}
