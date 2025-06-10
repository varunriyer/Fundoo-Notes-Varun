import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NotesService } from 'src/app/services/notes/notes.service';

@Component({
  selector: 'app-icon-list',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './icon-list.component.html',
  styleUrls: ['./icon-list.component.css'],
})
export class IconListComponent {
  @Input() context: 'input' | 'card' = 'input';
  @Input() noteID: string = '';
  @Output() colorSelected = new EventEmitter<string>();
  @Output() archived = new EventEmitter<void>();

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
  }

  handleArchive() {
    if (!this.noteID) return;

    const payload = {
      noteIdList: [this.noteID],
      isArchived: true,
    };

    this.notesService.archiveNote(payload).subscribe({
      next: (res: any) => {
        console.log('Archived', res);
        this.archived.emit();
      },
      error: (err) => {
        console.error('Archive failed:', err);
      },
    });
  }
}
