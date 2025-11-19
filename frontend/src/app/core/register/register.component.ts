import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/authService/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  loading = false;
  errorMessage: string | null = null;

  // Form group for registration
  form = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    password_confirmation: ['', [Validators.required]]
  });

  // Handle form submission
  onSubmit() {
    this.errorMessage = null;
    if (this.form.invalid) return;

    const { password, password_confirmation } = this.form.value;
    if (password !== password_confirmation) {
      this.errorMessage = 'Wachtwoorden komen niet overeen.';
      return;
    }

    this.loading = true;

    this.auth.register(this.form.value as any).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading = false;
        const msg =
          err?.error?.message ||
          err?.error?.email?.[0] ||
          'Registratie mislukt. Probeer opnieuw.';
        this.errorMessage = msg;
      }
    });
  }


}
