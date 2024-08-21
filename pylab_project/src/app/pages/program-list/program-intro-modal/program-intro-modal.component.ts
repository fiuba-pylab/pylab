import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

interface ResponseForm {
  name:string
  form: FormControl
}

@Component({
  selector: 'app-program-intro-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './program-intro-modal.component.html',
  styleUrl: './program-intro-modal.component.css'
})

export class ProgramIntroModalComponent implements OnInit{
  forms:ResponseForm[] = []
  data = inject(MAT_DIALOG_DATA);
  selects = this.data.program.inputs

  constructor(public dialog: MatDialogRef<ProgramIntroModalComponent>){

  }
  ngOnInit(): void {
    for(let select of this.selects){
      this.forms.push({name:select.name, form:new FormControl('')})
    }
  }
  onContinue(){
    let values = []
    for(let form of this.forms){
      values.push({name:form.name, value:form.form.value})
    }
    this.dialog.close(values)
  }

  onClose(){
    this.dialog.close(null)
  }

}
