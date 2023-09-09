import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonActionConfig } from '../../config/menu-actions.config';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit, OnDestroy {
  tableMenuItemOptions: any = CommonActionConfig.dropdownMenuItems;

  private onDestroy$ = new Subject();
  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

}
