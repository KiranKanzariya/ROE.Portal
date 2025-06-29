import { Routes } from '@angular/router';

import { authGuard } from './core/guard/auth.guard';

import { HomeComponent } from './features/home/home.component';
import { SigninComponent } from './features/account/signin/signin.component';
import { UserComponent } from './features/user/user.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
    { path: 'login', component: SigninComponent, canActivate: [authGuard]},
    {
        path:'',
        component: HomeComponent,
        children: [
            {
                path:'',
                component: DashboardComponent,
            },
            {
                path:'users',
                component: UserComponent,
            }
        ],
        canActivate: [authGuard]
    },
    // { path: '', redirectTo: '/home', pathMatch: 'full' }
];
