import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NoteCardComponent } from '../note-card/note-card.component';
import { NotesService } from 'src/app/services/notes/notes.service';

@Component({
  selector: 'app-trash',
  standalone: true,
  imports: [CommonModule, MatIconModule, NoteCardComponent],
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css'],
})
export class TrashComponent implements OnInit {
  trashedNotes: any[] = [];

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.loadTrashedNotes();
  }

  loadTrashedNotes() {
    this.notesService.getAllNotes().subscribe({
      next: (res: any) => {
        this.trashedNotes = res.data.data.filter((note: any) => note.isDeleted);
      },
      error: (err) => console.error('Failed to load trashed notes', err),
    });
  }
}
