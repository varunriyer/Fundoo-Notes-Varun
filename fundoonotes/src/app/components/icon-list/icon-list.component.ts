import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() colorSelected = new EventEmitter<string>();

  showColorPalette = false;

  lightColors: string[] = [
    '#ffffff',
    '#f28b82',
    '#fbbc04',
    '#fff475',
    '#ccff90',
    '#a7ffeb',
    '#cbf0f8',
    '#aecbfa',
    '#d7aefb',
    '#fdcfe8',
    '#e6c9a8',
    '#e8eaed',
  ];

  toggleColorPalette() {
    this.showColorPalette = !this.showColorPalette;
  }

  selectColor(color: string) {
    this.colorSelected.emit(color);
    this.showColorPalette = false;
  }
}
