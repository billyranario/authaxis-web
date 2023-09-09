import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

// CONFIGS
import { TabConfig } from '../../config';
import { Observable, Subject, catchError, of, takeUntil } from 'rxjs';

// INTERFACES
import { IApplication } from '../../interfaces/applications.interface';

// SERVICES
import { ApplicationApiService } from '../../../../../core/services/applications/application-api.service';
import { SnackBarConfig } from 'src/app/shared/configs';

@Component({
  selector: 'app-application-view',
  templateUrl: './application-view.component.html',
  styleUrls: ['./application-view.component.scss'],
})
export class ApplicationViewComponent implements OnInit, OnDestroy {
  params: { tenantId?: string } = {};
  payload: any = {
    relations:
      'metadata,sandbox,production,callbackUrls,crossOriginUrls,domains',
  };
  tabs: { basePath: string; endPath: string; label: string }[] =
    TabConfig.items;
  application: IApplication | null;
  application$: Observable<IApplication>;
  applicationLoading$: Observable<boolean>;

  private onDestroy$ = new Subject();

  constructor(
    private applicationApiService: ApplicationApiService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.getParams();
    this.getDataFromService();
    this.getApplication();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

  getParams(): void {
    this.route.params.subscribe((route) => {
      this.params = route;
      if (this.params.tenantId) {
        this.getApplicationFromService(this.params.tenantId);
      }
    });
  }

  private getDataFromService(): void {
    this.application$ = this.applicationApiService.application$;
    this.applicationLoading$ = this.applicationApiService.applicationLoading$;
  }

  private getApplicationFromService(id: string): void {
    this.applicationApiService
      .getById({ id, params: this.payload })
      .pipe(
        takeUntil(this.onDestroy$),
        catchError((err): any => {
          const { error } = err;
          this.snackBar.open(
            error?.message ?? 'Unable to load application',
            'OK',
            {
              duration: SnackBarConfig.duration,
            },
          );
          this.router.navigateByUrl('/admin/applications');
          
          return of(false);
        }),
      )
      .subscribe();
  }

  private getApplication(): void {
    this.application$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((application: IApplication) => {
        this.application = application ?? {};
      });
  }
}
