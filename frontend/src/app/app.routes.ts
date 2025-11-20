import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './core/login/login.component';
import { RegisterComponent } from './core/register/register.component';
import { MountainsComponent } from './core/mountains/mountains/mountains.component';
import { MountainDetailComponent } from './core/mountains/mountain-detail/mountain-detail.component';


export const routes: Routes = [
  { path: 'mountains', component: MountainsComponent, canActivate: [authGuard] },
  { path: 'mountains/:id', component: MountainDetailComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'mountains' }
];
