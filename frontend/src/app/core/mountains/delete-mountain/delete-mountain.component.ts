import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MountainService } from '../../../shared/services/mountainService/mountain.service';
import { Mountain } from '../../../shared/Models/mountain.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-mountain',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-mountain.component.html',
  styleUrl: './delete-mountain.component.css'
})
export class DeleteMountainComponent {
  private mountainService = inject(MountainService);

  @Input() mountain!: Mountain;
  @Output() mountainDeleted = new EventEmitter<number>();

  loading = false;

  confirmDelete(): void {
    const ok = window.confirm(`Weet je zeker dat je "${this.mountain.name}" wilt verwijderen?`);
    if (!ok) return;

    this.loading = true;

    this.mountainService.delete(this.mountain.id).subscribe({
      next: () => {
        this.loading = false;
        this.mountainDeleted.emit(this.mountain.id);
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
        alert('Kon berg niet verwijderen.');
      }
    });
  }
}
