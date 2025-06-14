import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteInputComponent } from '../note-input/note-input.component';
import { NoteCardComponent } from '../note-card/note-card.component';
import { NotesService } from 'src/app/services/notes/notes.service';
import { ViewModeService } from 'src/app/services/view-mode/view-mode.service';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, NoteInputComponent, NoteCardComponent],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit {
  allNotes: any[] = [];
  pinnedNotes: any[] = [];
  unpinnedNotes: any[] = [];
  filteredNotes: any[] = [];

  viewMode: 'grid' | 'list' = 'list';
  isSearching = false;

  constructor(
    private notesService: NotesService,
    private viewModeService: ViewModeService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.loadNotes();

    this.viewModeService.view$.subscribe((mode) => {
      this.viewMode = mode;
    });

    this.searchService.searchTerm$.subscribe((term) => {
      this.isSearching = term.trim().length > 0;
      this.applySearch(term);
    });
  }

  loadNotes() {
    this.notesService.getAllNotes().subscribe({
      next: (res: any) => {
        this.allNotes = res.data.data
          .filter((note: any) => !note.isArchived && !note.isDeleted)
          .reverse(); // Newest on top

        this.pinnedNotes = this.allNotes.filter((n) => n.isPined);
        this.unpinnedNotes = this.allNotes.filter((n) => !n.isPined);

        this.filteredNotes = [...this.allNotes]; // fallback when not searching
      },
      error: (err) => console.error('Failed to load notes', err),
    });
  }

  applySearch(term: string) {
    const lowerTerm = term.toLowerCase();
    this.filteredNotes = this.allNotes.filter((note) =>
      (note.title + ' ' + note.description).toLowerCase().includes(lowerTerm)
    );
  }
}
