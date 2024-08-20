import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-program-intro-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './program-intro-modal.component.html',
  styleUrl: './program-intro-modal.component.css'
})
export class ProgramIntroModalComponent {
  data = inject(MAT_DIALOG_DATA);
  private introduction:string = ""

  constructor(public dialog: MatDialogRef<ProgramIntroModalComponent>){

  }
  onContinue(){
    this.dialog.close(true)
  }

  onClose(){
    this.dialog.close(false)
  }

}
