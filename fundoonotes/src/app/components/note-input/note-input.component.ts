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

@Component({
  selector: 'app-note-input',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule, ReactiveFormsModule],
  templateUrl: './note-input.component.html',
  styleUrls: ['./note-input.component.css'],
})
export class NoteInputComponent {
  isExpanded = false;
  noteForm: FormGroup;
  justExpanded: boolean = false;

  constructor(private fb: FormBuilder, private eRef: ElementRef) {
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
    // Optional: emit or store the note
    const note = this.noteForm.value;
    console.log('Note submitted:', note);

    this.noteForm.reset(); // Clear the form
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
