import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './toolbar/sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NoteInputComponent } from 'src/app/components/note-input/note-input.component';
import { NoteCardComponent } from 'src/app/components/note-card/note-card.component';
import { NotesService } from 'src/app/services/notes/notes.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ToolbarComponent,
    SidenavComponent,
    MatSidenavModule,
    NoteInputComponent,
    NoteCardComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  isSidenavOpen = false;
  isHovered = false;
  allNotes: any[] = [];

  constructor(private notesService: NotesService) {}

  get sidenavOpened(): boolean {
    return this.isSidenavOpen || this.isHovered;
  }

  onMouseEnterSidenav() {
    this.isHovered = true;
  }

  onMouseLeaveSidenav() {
    this.isHovered = false;
  }

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes() {
    this.notesService.getAllNotes().subscribe({
      next: (res: any) => {
        // Filter out trashed or archived notes
        this.allNotes = res.data.data.filter(
          (note: any) => !note.isArchived && !note.isDeleted
        );
      },
      error: (err) => console.error('Failed to load notes', err),
    });
  }
}
