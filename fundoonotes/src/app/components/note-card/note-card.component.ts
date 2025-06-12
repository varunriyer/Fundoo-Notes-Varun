import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { IconListComponent } from '../icon-list/icon-list.component';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, IconListComponent],
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.css'],
})
export class NoteCardComponent {
  @Input() notes: any[] = [];
  @Input() isArchiveContext: boolean = false;
  @Input() isTrashContext: boolean = false;
  @Input() viewMode: string = 'grid';

  hoveredIndex: number | null = null;

  onNoteArchived(archivedId: string) {
    this.notes = this.notes.filter((note) => note.id !== archivedId);
  }

  onNoteTrashed(trashedId: string) {
    this.notes = this.notes.filter((note) => note.id !== trashedId);
  }

  onNoteColorChanged(noteId: string, newColor: string) {
    this.notes = this.notes.map((note) =>
      note.id === noteId ? { ...note, color: newColor } : note
    );
  }

  onNoteRestored(id: string) {
    this.notes = this.notes.filter((note) => note.id !== id);
  }

  onNoteDeletedForever(id: string) {
    this.notes = this.notes.filter((note) => note.id !== id);
  }
}
