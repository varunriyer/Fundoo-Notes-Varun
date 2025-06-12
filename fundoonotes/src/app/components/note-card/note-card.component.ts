import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { IconListComponent } from '../icon-list/icon-list.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditNoteComponent } from '../edit-note/edit-note.component';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, IconListComponent, MatDialogModule],
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.css'],
})
export class NoteCardComponent {
  @Input() notes: any[] = [];
  @Input() isArchiveContext: boolean = false;
  @Input() isTrashContext: boolean = false;
  @Input() viewMode: string = 'grid';

  hoveredIndex: number | null = null;

  constructor(private dialog: MatDialog) {}

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

  openEditDialog(note: any) {
    const dialogRef = this.dialog.open(EditNoteComponent, {
      width: '600px',
      data: { ...note },
    });

    dialogRef.afterClosed().subscribe((updatedNote) => {
      if (updatedNote) {
        this.notes = this.notes.map((n) =>
          n.id === updatedNote.id ? { ...n, ...updatedNote } : n
        );
      }
    });
  }
}
