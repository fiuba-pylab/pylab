import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-program-intro-modal',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './program-intro-modal.component.html',
  styleUrl: './program-intro-modal.component.css'
})
export class ProgramIntroModalComponent {
  data = inject(MAT_DIALOG_DATA);
  private introduction:string = ""
}
