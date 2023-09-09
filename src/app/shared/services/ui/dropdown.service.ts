import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {
  private _openedDropdown = new BehaviorSubject<string | null>(null);

  openedDropdown$ = this._openedDropdown.asObservable();

  openDropdown(id: string) {
    this._openedDropdown.next(id);
  }
  closeDropdowns() {
    this._openedDropdown.next(null);
  }
}
