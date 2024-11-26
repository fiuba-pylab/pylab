import { Component, EventEmitter, Output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { NavigationService } from '../../services/navigation.service';
import { NavigationEnd, Router } from '@angular/router';
import { HelpDialogComponent } from '../../components/help-dialog/help-dialog.component';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() sidebarEvent = new EventEmitter<any>();
  showBackButton: boolean = false;

  constructor(public dialog: MatDialog, private navigationService: NavigationService, private router: Router){
    this.navigationService.startSaveHistory();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showBackButton = !event.url.startsWith('/info/') && !event.url.startsWith('/intro');     
      }
    });
  }

  openHelpDialog(){
    const dialogRef = this.dialog.open(HelpDialogComponent, {});
  }

  goBack(): void {
    this.navigationService.goBack();
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }
}
