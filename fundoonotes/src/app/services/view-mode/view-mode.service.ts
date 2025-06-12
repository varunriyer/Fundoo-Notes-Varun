import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ViewModeService {
  private viewSource = new BehaviorSubject<'grid' | 'list'>('grid');
  view$ = this.viewSource.asObservable();

  setView(view: 'grid' | 'list') {
    this.viewSource.next(view);
  }
}
