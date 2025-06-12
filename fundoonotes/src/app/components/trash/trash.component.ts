import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NoteCardComponent } from '../note-card/note-card.component';
import { NotesService } from 'src/app/services/notes/notes.service';
import { ViewModeService } from 'src/app/services/view-mode/view-mode.service';

@Component({
  selector: 'app-trash',
  standalone: true,
  imports: [CommonModule, MatIconModule, NoteCardComponent],
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css'],
})
export class TrashComponent implements OnInit {
  trashedNotes: any[] = [];
  viewMode: 'grid' | 'list' = 'list';

  constructor(
    private notesService: NotesService,
    private viewModeService: ViewModeService
  ) {}

  ngOnInit(): void {
    this.loadTrashedNotes();

    this.viewModeService.view$.subscribe((mode) => {
      this.viewMode = mode;
    });
  }

  loadTrashedNotes() {
    this.notesService.getTrashedNotes().subscribe({
      next: (res: any) => {
        this.trashedNotes = res.data.data.reverse();
      },
      error: (err) => console.error('Failed to load trashed notes', err),
    });
  }
}
