import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

interface ResponseForm {
  name:string
  form: FormControl
}

@Component({
  selector: 'app-program-intro-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, CommonModule, MatIconModule],
  templateUrl: './program-intro-modal.component.html',
  styleUrl: './program-intro-modal.component.css'
})

export class ProgramIntroModalComponent implements OnInit{
  forms:ResponseForm[] = []
  data = inject(MAT_DIALOG_DATA);

  constructor(public dialog: MatDialogRef<ProgramIntroModalComponent>){

  }
  ngOnInit(): void {

  }
  onContinue(){
    this.dialog.close(true)
  }

  onClose(){
    this.dialog.close(false)
  }

}
