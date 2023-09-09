import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

// COMPONENTS
import { UserFormComponent } from '../user-form/user-form.component';

// CONFIG
import { MenuActionConfig } from '../../config/menu-actions.config';

// INTERFACES
import { IUser } from '../../interfaces/user.interface';

// SERVICES
import { DialogService } from '../../../../../shared/services/ui/dialog.service';
import { UserApiService } from 'src/app/core/services/users/user-api.service';

// UTILS
import { trackById } from '../../../../../shared/utils';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnDestroy, OnInit {
  tableMenuItemOptions: any = MenuActionConfig.dropdownMenuItems;
  users: IUser[] = [];
  params: { [param: string]: string | string[] } = {};

  trackById = trackById;

  private onDestroy$ = new Subject();

  constructor(
    private dialogService: DialogService,
    private router: Router,
    private userApiService: UserApiService,
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

  onViewUser(appId: string | number): void {
    this.router.navigate(['/admin/user-management/user', appId, 'details']);
  }

  onSelectApplication(tenantId: string): void {
    this.params = { ...this.params, tenantId };
    this.getUsers();
  }

  onOpenCreateUserDialog(): void {
    this.dialogService
      .open(UserFormComponent)
      .afterClosed()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe();
  }

  private getUsers(): void {
    this.userApiService
      .get(this.params)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (response: { data: IUser[] }) => {
          this.users = response.data ?? [];
        },
        error: (error: any) => console.log(error),
      });
  }
}
