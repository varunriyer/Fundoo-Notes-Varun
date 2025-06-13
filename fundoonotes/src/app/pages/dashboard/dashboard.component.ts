import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './toolbar/sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NoteInputComponent } from 'src/app/components/note-input/note-input.component';
import { NoteCardComponent } from 'src/app/components/note-card/note-card.component';
import { NotesService } from 'src/app/services/notes/notes.service';
import { RouterModule } from '@angular/router';

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
    RouterModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  isSidenavOpen = false;
  isHovered = false;
  allNotes: any[] = [];
  searchTerm: string = '';

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

  onSearchChanged(term: string) {
    this.searchTerm = term;
  }
}
