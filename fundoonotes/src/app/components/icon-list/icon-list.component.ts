import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NotesService } from 'src/app/services/notes/notes.service';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-icon-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './icon-list.component.html',
  styleUrls: ['./icon-list.component.css'],
})
export class IconListComponent {
  @Input() context: 'input' | 'card' | 'trash' = 'input';
  @Input() noteID: string = '';
  @Input() isArchivedView: boolean = false;
  @Output() colorSelected = new EventEmitter<string>();
  @Output() archived = new EventEmitter<void>();
  @Output() trashed = new EventEmitter<void>();
  @Output() colorChanged = new EventEmitter<string>();
  @Output() restored = new EventEmitter<void>();
  @Output() deletedForever = new EventEmitter<void>();
  @Output() reminderSet = new EventEmitter<void>();

  showColorPalette = false;

  lightColors: string[] = [
    '#ffffff',
    '#f28b82',
    '#fbbc04',
    '#fff475',
    '#ccff90',
    '#a7ffeb',
    '#cbf0f8',
    '#aecbfa',
    '#d7aefb',
    '#fdcfe8',
    '#e6c9a8',
    '#e8eaed',
  ];

  constructor(private notesService: NotesService) {}

  toggleColorPalette() {
    this.showColorPalette = !this.showColorPalette;
  }

  selectColor(color: string) {
    this.colorSelected.emit(color);
    this.showColorPalette = false;

    if (this.context === 'card' && this.noteID) {
      const payload = {
        color: color,
        noteIdList: [this.noteID],
      };

      this.notesService.changeNoteColor(payload).subscribe({
        next: (res: any) => {
          console.log('Color updated successfully:', res);
          this.colorChanged.emit(color);
        },
        error: (err) => {
          console.error('Failed to update note color:', err);
        },
      });
    }
  }

  handleArchive() {
    if (!this.noteID) return;

    const payload = {
      noteIdList: [this.noteID],
      isArchived: !this.isArchivedView,
    };

    this.notesService.archiveNote(payload).subscribe({
      next: (res: any) => {
        console.log('Archive toggled', res);
        this.archived.emit();
      },
      error: (err) => {
        console.error('Archive failed:', err);
      },
    });
  }

  handleTrash() {
    if (!this.noteID) return;

    const payload = {
      noteIdList: [this.noteID],
      isDeleted: true,
    };

    this.notesService.trashNote(payload).subscribe({
      next: (res: any) => {
        console.log('Trashed', res);
        this.trashed.emit();
      },
      error: (err) => {
        console.error('Trash failed:', err);
      },
    });
  }

  handleRestore() {
    if (!this.noteID) return;

    const payload = {
      noteIdList: [this.noteID],
      isDeleted: false,
    };

    this.notesService.trashNote(payload).subscribe({
      next: () => {
        console.log('Note restored');
        this.restored.emit();
      },
      error: (err) => console.error('Restore failed', err),
    });
  }

  handleDeleteForever() {
    if (!this.noteID) return;

    const payload = {
      noteIdList: [this.noteID],
    };

    this.notesService.deleteForever(payload).subscribe({
      next: () => {
        console.log('Note deleted forever');
        this.deletedForever.emit();
      },
      error: (err) => console.error('Delete forever failed', err),
    });
  }

  handleReminder() {
    if (!this.noteID) return;

    const reminderTime = new Date();
    reminderTime.setMinutes(reminderTime.getMinutes() + 1); //Default 1 min reminder

    const payload = {
      noteIdList: [this.noteID],
      reminder: [reminderTime.toISOString()],
    };

    this.notesService.addReminder(payload).subscribe({
      next: () => {
        console.log('Reminder set');
        this.reminderSet.emit();
      },
      error: (err) => console.error('Reminder failed', err),
    });
  }
}
