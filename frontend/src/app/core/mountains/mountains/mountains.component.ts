import { Component, inject, OnInit } from '@angular/core';
import { MountainService } from '../../../shared/services/mountainService/mountain.service';
import { Mountain } from '../../../shared/Models/mountain.model';
import { AddMountainComponent } from '../add-mountain/add-mountain.component';
import { CommonModule } from '@angular/common';
import { MountainItemComponent } from '../mountain-item/mountain-item.component';

@Component({
  selector: 'app-mountains',
  standalone: true,
  imports: [CommonModule, AddMountainComponent, MountainItemComponent],
  templateUrl: './mountains.component.html',
  styleUrl: './mountains.component.css'
})
export class MountainsComponent implements OnInit {
  private mountainService = inject(MountainService);

  mountains: Mountain[] = [];
  loadingList = false;
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.loadMountains();
  }

  loadMountains(): void {
    this.loadingList = true;
    this.errorMessage = null;

    this.mountainService.getAll().subscribe({
      next: (data) => {
        this.mountains = data;
        this.loadingList = false;
      },
      error: (err) => {
        console.error(err);
        this.loadingList = false;
        this.errorMessage = 'Kon bergen niet laden.';
      }
    });
  }

  onMountainCreated(mountain: Mountain): void {
    this.mountains = [...this.mountains, mountain];
  }

  onMountainUpdated(updated: Mountain): void {
    this.mountains = this.mountains.map((m) =>
      m.id === updated.id ? updated : m
    );
  }

  onMountainDeleted(id: number): void {
    this.mountains = this.mountains.filter((m) => m.id !== id);
  }
}