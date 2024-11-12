import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-help-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatIcon],
  templateUrl: './help-dialog.component.html',
  styleUrl: './help-dialog.component.css'
})
export class HelpDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<HelpDialogComponent>,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  navigateToHome() {
    this.router.navigate(['/pylab-deploy/home']);
  }


}
