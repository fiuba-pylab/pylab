import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ProgramDisplayComponent } from '../program-display/program-display.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'display', component: ProgramDisplayComponent },
];

