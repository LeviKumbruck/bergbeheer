import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MountainService } from '../../../shared/services/mountainService/mountain.service';
import { Mountain } from '../../../shared/Models/mountain.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mountain-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mountain-detail.component.html',
  styleUrl: './mountain-detail.component.css'
})
export class MountainDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private mountainService = inject(MountainService);

  mountain: Mountain | null = null;
  loading = false;
  errorMessage: string | null = null;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.errorMessage = 'Ongeldig mountain id.';
      return;
    }

    this.loading = true;
    this.mountainService.getById(id).subscribe({
      next: (m) => {
        this.mountain = m;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.errorMessage = 'Kon berg niet laden.';
      }
    });
  }
}
