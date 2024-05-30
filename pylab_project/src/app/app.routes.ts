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
        ]

    },
    { 
        path: '**',
        redirectTo: 'home'
    }
];

