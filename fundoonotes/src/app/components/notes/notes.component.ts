import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteInputComponent } from '../note-input/note-input.component';
import { NoteCardComponent } from '../note-card/note-card.component';
import { NotesService } from 'src/app/services/notes/notes.service';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, NoteInputComponent, NoteCardComponent],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit {
  allNotes: any[] = [];

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes() {
    this.notesService.getAllNotes().subscribe({
      next: (res: any) => {
        this.allNotes = res.data.data
          .filter((note: any) => !note.isArchived && !note.isDeleted)
          .reverse();
      },
      error: (err) => console.error('Failed to load notes', err),
    });
  }
}
