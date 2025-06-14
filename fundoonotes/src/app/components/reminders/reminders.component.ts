import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NoteCardComponent } from '../note-card/note-card.component';
import { NotesService } from 'src/app/services/notes/notes.service';

@Component({
  selector: 'app-reminders',
  standalone: true,
  imports: [CommonModule, MatIconModule, NoteCardComponent],
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.css'],
})
export class RemindersComponent implements OnInit {
  reminderNotes: any[] = [];

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.notesService.getReminderNotes().subscribe({
      next: (res: any) => {
        this.reminderNotes = res.data.data.filter(
          (note: any) => !note.isDeleted
        );
      },
      error: (err) => console.error('Failed to fetch reminders', err),
    });
  }
}
