import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { IconListComponent } from '../icon-list/icon-list.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditNoteComponent } from '../edit-note/edit-note.component';
import { NotesService } from 'src/app/services/notes/notes.service';

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
  @Output() noteUpdated = new EventEmitter<void>();

  hoveredIndex: number | null = null;

  constructor(private dialog: MatDialog, private notesService: NotesService) {}

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

  openEditDialog(note: any): void {
    const dialogRef = this.dialog.open(EditNoteComponent, {
      width: '600px',
      data: {
        id: note.id,
        title: note.title,
        description: note.description,
        color: note.color,
      },
      panelClass: 'custom-dialog-container',
      autoFocus: false,
      disableClose: true,
    });

    dialogRef.backdropClick().subscribe(() => {
      const componentInstance = dialogRef.componentInstance;
      if (componentInstance) {
        componentInstance.save();
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'updated') {
        this.noteUpdated.emit();
      }
    });
  }
  onReminderSet() {
    console.log('Reminder successfully set.');
  }

  togglePin(note: any) {
    const updatedPinStatus = !note.isPined;

    this.notesService
      .pinUnpinNote({
        noteIdList: [note.id],
        isPined: updatedPinStatus,
      })
      .subscribe({
        next: () => {
          note.isPined = updatedPinStatus;
          this.noteUpdated.emit();
        },
        error: (err) => console.error('Pin/unpin failed', err),
      });
  }
}
