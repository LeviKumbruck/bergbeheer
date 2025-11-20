import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MountainService } from '../../../shared/services/mountainService/mountain.service';
import { Mountain, MountainPayload } from '../../../shared/Models/mountain.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-mountain',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-mountain.component.html',
  styleUrl: './edit-mountain.component.css'
})
export class EditMountainComponent {
  private fb = inject(FormBuilder);
  private mountainService = inject(MountainService);

  @Input() mountain!: Mountain;
  @Output() mountainUpdated = new EventEmitter<Mountain>();

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
    this.form.setValue({
      name: this.mountain.name,
      location: this.mountain.location,
      height: this.mountain.height,
      description: this.mountain.description ?? ''
    });
    this.errorMessage = null;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.loading = false;
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.loading = true;
    const payload = this.form.value as MountainPayload;

    this.mountainService.update(this.mountain.id, payload).subscribe({
      next: (updated) => {
        this.loading = false;
        this.mountainUpdated.emit(updated);
        this.closeModal();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.errorMessage = 'Kon berg niet updaten.';
      }
    });
  }
}