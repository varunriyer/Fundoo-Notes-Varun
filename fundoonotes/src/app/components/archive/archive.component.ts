import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NoteCardComponent } from '../note-card/note-card.component';
import { NotesService } from 'src/app/services/notes/notes.service';

@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [CommonModule, MatIconModule, NoteCardComponent],
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css'],
})
export class ArchiveComponent implements OnInit {
  archivedNotes: any[] = [];

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.loadArchivedNotes();
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
