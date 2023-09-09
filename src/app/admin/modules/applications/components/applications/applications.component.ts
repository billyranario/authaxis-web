import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

// COMPONENTS
import { ApplicationFormComponent } from '../application-form/application-form.component';
import { UiConfirmComponent } from '../../../../../shared/components/ui-confirm/ui-confirm.component';

// CONFIG
import { MenuActionConfig } from '../../config';
import { DialogConfig } from '../../../../../shared/configs/ui/Dialog.config';
import { SnackBarConfig } from '../../../../../shared/configs/snackbar.config';

// SERVICES
import { ApplicationApiService } from 'src/app/core/services/applications/application-api.service';
import { DialogService } from '../../../../../shared/services/ui/dialog.service';

// UTILS
import { IApplication } from '../../interfaces/applications.interface';
import { trackById } from '../../../../../shared/utils';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
})
export class ApplicationsComponent implements OnDestroy, OnInit {
  tableMenuItemOptions: any = MenuActionConfig.dropdownMenuItems;
  meta: any = {
    length: 0,
    pageSizeOptions: [5, 15, 50],
  };
  params: any = {
    relations: 'domains',
    perPage: 15,
    page: 1,
  };
  applications: IApplication[] = [];
  loadingApplications: boolean = false;

  trackById = trackById;

  private onDestroy$ = new Subject();

  constructor(
    private applicationApiService: ApplicationApiService,
    private dialogService: DialogService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.getApplications();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

  openCreateApplicationDialog(): void {
    this.dialogService
      .open(ApplicationFormComponent)
      .afterClosed()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((response) => {
        if (response) {
          this.getApplications();
        }
      });
  }

  onViewApplication(appId: string): void {
    this.router.navigate(['/admin/applications', appId, 'settings']);
  }

  onDelete(appId: string): void {
    this.dialogService
      .open(UiConfirmComponent, {
        width: DialogConfig.sizes.sm,
        data: {
          title: 'Delete Application',
          message: `This will delete the application and its corresponding data. Proceed?`,
        },
      })
      .afterClosed()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((confirm: boolean) => {
        if (confirm) {
          this.deleteApplication(appId);
        }
      });
  }

  onChangePage(event: PageEvent): void {
    this.params.page = event.pageIndex + 1;
    this.params.perPage = event.pageSize;
    this.getApplications();
  }

  private getApplications(): void {
    this.loadingApplications = true;
    this.applicationApiService
      .get(this.params)
      .pipe(
        takeUntil(this.onDestroy$),
        finalize(() => (this.loadingApplications = false)),
      )
      .subscribe({
        next: (response: any) => {
          const { data, meta } = response;
          this.meta.length = meta.total ?? 0;
          this.applications = data;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  private deleteApplication(appId: string): void {
    this.loadingApplications = true;
    this.applicationApiService
      .delete(appId)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (response) => {
          const { data, message } = response;
          this.snackBar.open(message, 'OK', {
            duration: SnackBarConfig.duration,
            panelClass: 'success',
          });
          this.getApplications();
        },
        error: (err) => {
          const { error } = err;
          this.snackBar.open(
            error?.message ?? 'Unable to load application',
            'OK',
            {
              duration: SnackBarConfig.duration,
            },
          );
          this.loadingApplications = false;
        },
      });
  }
}
