import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ViewModeService } from 'src/app/services/view-mode/view-mode.service';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatToolbarModule],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  isGrid = true;
  mobileSearchOpen = false;

  @Output() menuClicked = new EventEmitter<void>();
  @Output() searchChanged = new EventEmitter<string>();

  currentTitle: string = 'Keep';

  constructor(
    private router: Router,
    private viewModeService: ViewModeService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const routeSegment = this.router.url.split('/').pop();
        switch (routeSegment) {
          case 'notes':
            this.currentTitle = 'Keep';
            break;
          case 'reminders':
            this.currentTitle = 'Reminders';
            break;
          case 'archive':
            this.currentTitle = 'Archive';
            break;
          case 'trash':
            this.currentTitle = 'Trash';
            break;
          default:
            this.currentTitle = 'Keep';
        }
      });
  }

  toggleView() {
    this.isGrid = !this.isGrid;
    const mode: 'grid' | 'list' = this.isGrid ? 'grid' : 'list';
    this.viewModeService.setView(mode);
  }

  refreshPage() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(currentUrl);
    });
  }

  toggleSidebar() {
    this.menuClicked.emit();
  }

  onSearchChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchService.updateSearchTerm(value);
  }
}
