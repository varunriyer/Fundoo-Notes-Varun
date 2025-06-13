import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IconListComponent } from '../icon-list/icon-list.component';
import { NotesService } from 'src/app/services/notes/notes.service';

@Component({
  selector: 'app-edit-note',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    IconListComponent,
  ],
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css'],
})
export class EditNoteComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notesService: NotesService
  ) {
    // this.noteForm = this.fb.group({
    //   title: [data.title],
    //   description: [data.description],
    // });
  }
  noteForm!: FormGroup;
  selectedColor = '';

  ngOnInit(): void {
    this.selectedColor = this.data.color || '';
    this.noteForm = this.fb.group({
      title: [this.data.title || ''],
      description: [this.data.description || ''],
    });
  }

  close() {
    this.dialogRef.close();
  }

  onColorChange(color: string) {
    this.selectedColor = color;
  }

  save() {
    const updatedNote = {
      noteId: this.data.id,
      title: this.noteForm.value.title,
      description: this.noteForm.value.description,
      color: this.selectedColor || this.data.color || '#ffffff',
    };

    this.notesService.updateNote(updatedNote).subscribe({
      next: (res) => {
        this.dialogRef.close('updated'); // you can pass back a flag or updated note if needed
      },
      error: (err) => {
        console.error('Update failed:', err);
      },
    });
  }
}
