import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Mountain } from '../../../shared/Models/mountain.model';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EditMountainComponent } from '../edit-mountain/edit-mountain.component';
import { DeleteMountainComponent } from '../delete-mountain/delete-mountain.component';

@Component({
  selector: 'app-mountain-item',
  standalone: true,
  imports: [RouterLink, CommonModule, EditMountainComponent, DeleteMountainComponent, ],
  templateUrl: './mountain-item.component.html',
  styleUrl: './mountain-item.component.css'
})
export class MountainItemComponent {
  @Input() mountain!: Mountain;

  @Output() updated = new EventEmitter<Mountain>();
  @Output() deleted = new EventEmitter<number>();

  onMountainUpdated(m: Mountain): void {
    this.updated.emit(m);
  }

  onMountainDeleted(id: number): void {
    this.deleted.emit(id);
  }
}

