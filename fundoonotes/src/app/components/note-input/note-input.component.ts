import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { HostListener, ElementRef } from '@angular/core';
import { NotesService } from 'src/app/services/notes/notes.service';
import { IconListComponent } from '../icon-list/icon-list.component';

@Component({
  selector: 'app-note-input',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    IconListComponent,
  ],
  templateUrl: './note-input.component.html',
  styleUrls: ['./note-input.component.css'],
})
export class NoteInputComponent {
  isExpanded = false;
  noteForm: FormGroup;
  justExpanded: boolean = false;

  constructor(
    private fb: FormBuilder,
    private eRef: ElementRef,
    private notesService: NotesService
  ) {
    this.noteForm = this.fb.group({
      title: [''],
      description: [''],
    });
  }

  expandNoteInput() {
    this.isExpanded = true;
    this.justExpanded = true;

    setTimeout(() => {
      this.justExpanded = false;
    });
  }

  closeNoteInput() {
    const note = this.noteForm.value;

    if (note.title.trim() || note.description.trim()) {
      const payload = {
        title: note.title,
        description: note.description,
        isPinned: false,
      };

      this.notesService.addNote(payload).subscribe({
        next: (res) => {
          console.log('Note added:', res);
        },
        error: (err) => {
          console.error('Error adding note:', err);
        },
      });
    }

    this.noteForm.reset();
    this.isExpanded = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (this.justExpanded) return;

    if (this.isExpanded && !this.eRef.nativeElement.contains(event.target)) {
      this.closeNoteInput();
    }
  }
}
