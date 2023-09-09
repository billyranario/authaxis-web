import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonActionConfig } from '../../config/menu-actions.config';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit, OnDestroy {
  tableMenuItemOptions: any = CommonActionConfig.dropdownMenuItems;

  private onDestroy$ = new Subject();
  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }
}
