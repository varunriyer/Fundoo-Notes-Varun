import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-icon-list',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './icon-list.component.html',
  styleUrls: ['./icon-list.component.css'],
})
export class IconListComponent {
  @Input() context: 'input' | 'card' = 'input';
}
