import { Routes } from '@angular/router';

export const routes: Routes = [
    { 
        path: '', 
        loadComponent: () => import('./layout/layout.component').then((m) => m.LayoutComponent),
        children: [
            { 
                path: 'home', 
                loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent)
            },
            {
                path: 'list', 
                loadComponent: () => import('./pages/program-list/program-list.component').then((m) => m.ProgramListComponent)
            },
            {
                path: 'display', 
                loadComponent: () => import('./pages/program-display/program-display.component').then((m) => m.ProgramDisplayComponent)
            }
        ]

    },
    { 
        path: '**',
        redirectTo: 'home'
    }
];

