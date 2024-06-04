import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-helpDialog',
  templateUrl: './helpDialog.component.html',
  styleUrls: ['./helpDialog.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent]
})
export class HelpDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<HelpDialogComponent>,
  ) { }

  ngOnInit() {
  }

}
