import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Mountain, MountainPayload } from '../../../shared/Models/mountain.model';
import { MountainService } from '../../../shared/services/mountainService/mountain.service';

@Component({
  selector: 'app-add-mountain',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-mountain.component.html'
})
export class AddMountainComponent {
  private fb = inject(FormBuilder);
  private mountainService = inject(MountainService);

  @Output() mountainCreated = new EventEmitter<Mountain>();

  showModal = false;
  loading = false;
  errorMessage: string | null = null;

  form = this.fb.group({
    name: ['', [Validators.required]],
    location: ['', [Validators.required]],
    height: [0, [Validators.required, Validators.min(0)]],
    description: ['']
  });

  openModal(): void {
    this.form.reset();
    this.form.patchValue({ height: 0 });
    this.errorMessage = null;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.loading = false;
  }

  onSubmit(): void {
    this.errorMessage = null;

    if (this.form.invalid) return;

    this.loading = true;
    const payload = this.form.value as MountainPayload;

    this.mountainService.create(payload).subscribe({
      next: (created) => {
        this.loading = false;
        this.mountainCreated.emit(created);
        this.closeModal();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.errorMessage = 'Kon berg niet aanmaken.';
      }
    });
  }
}
