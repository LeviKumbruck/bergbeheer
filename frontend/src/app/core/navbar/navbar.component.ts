import { Component, inject } from '@angular/core';
import { AuthService } from '../../shared/services/authService/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  // Check if the user is authenticated
  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  // Get the logged-in user's name
  get userName(): string | null {
    return this.authService.user?.name ?? null;
  }

  // True on /login and /register
  get isAuthPage(): boolean {
    const url = this.router.url;
    return url.startsWith('/login') || url.startsWith('/register');
  }

  // Logout the user
  logout() {
    this.authService.logout().subscribe({
      next: () => {},
      error: () => {}
    });
    this.router.navigate(['/login']);
  }
}
