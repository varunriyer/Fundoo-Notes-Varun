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
    this.notesService.getAllNotes().subscribe({
      next: (res: any) => {
        this.archivedNotes = res.data.data.filter(
          (note: any) => note.isArchived && !note.isDeleted
        );
      },
      error: (err) => console.error('Failed to load archived notes', err),
    });
  }
}
