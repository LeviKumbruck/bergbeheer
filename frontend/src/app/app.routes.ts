import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './core/login/login.component';
import { RegisterComponent } from './core/register/register.component';
import { Component } from '@angular/core';

//temporary component for /home route, this isnt gonna be the final home component
@Component({
  standalone: true,
  selector: 'app-mountains',
  template: `
    <div class="p-6">
      <h2 class="text-2xl font-semibold mb-2">Bergen overzicht</h2>
      <p class="text-slate-300">Hier komt later het beheer van de bergen.</p>
    </div>
  `
})
export class MountainsComponent {}

export const routes: Routes = [
  { path: 'home', component: MountainsComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'home' }
];
