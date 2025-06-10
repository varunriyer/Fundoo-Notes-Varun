import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

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

  currentTitle: string = 'Keep';

  constructor(private router: Router) {}

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
  }

  refreshPage() {
    location.reload();
  }

  toggleSidebar() {
    this.menuClicked.emit();
  }
}
