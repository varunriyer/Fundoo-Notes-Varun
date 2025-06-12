import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NoteCardComponent } from '../note-card/note-card.component';
import { NotesService } from 'src/app/services/notes/notes.service';
import { ViewModeService } from 'src/app/services/view-mode/view-mode.service';

@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [CommonModule, MatIconModule, NoteCardComponent],
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css'],
})
export class ArchiveComponent implements OnInit {
  archivedNotes: any[] = [];
  viewMode: 'grid' | 'list' = 'list';

  constructor(
    private notesService: NotesService,
    private viewModeService: ViewModeService
  ) {}

  ngOnInit(): void {
    this.loadArchivedNotes();

    this.viewModeService.view$.subscribe((mode) => {
      this.viewMode = mode;
    });
  }

  loadArchivedNotes() {
    this.notesService.getArchivedNotes().subscribe({
      next: (res: any) => {
        this.archivedNotes = res.data.data.reverse();
      },
      error: (err) => console.error('Failed to load archived notes', err),
    });
  }

  onNoteArchived(noteId: string) {
    this.archivedNotes = this.archivedNotes.filter(
      (note) => note.id !== noteId
    );
  }
}
