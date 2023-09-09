import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';

// CONFIGS
import { SnackBarConfig } from '../../../../../shared/configs/snackbar.config';

// INTERFACES
import {
  IApplication,
  EDomainType,
  IApplicationDomain,
} from '../../interfaces/applications.interface';

// SERVICES
import { ApplicationApiService } from '../../../../../core/services/applications/application-api.service';

@Component({
  selector: 'application-view-api',
  templateUrl: './application-view-api.component.html',
  styleUrls: ['./application-view-api.component.scss'],
})
export class ApplicationViewApiComponent implements OnInit, OnDestroy {
  application: IApplication;
  application$: Observable<IApplication>;
  applicationLoading$: Observable<boolean>;
  showSecret: boolean = false;
  eDomainType = EDomainType;

  private onDestroy$ = new Subject();

  constructor(
    private applicationApiService: ApplicationApiService,
    private clipboard: Clipboard,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.getDataFromService();
    this.getApplication();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

  onCopyClipboard(value: string): void {
    this.clipboard.copy(value);
    this.snackBar.open('Copied to clipboard.', 'OK', {
      duration: SnackBarConfig.duration,
    });
  }

  private getDataFromService(): void {
    this.application$ = this.applicationApiService.application$;
    this.applicationLoading$ = this.applicationApiService.applicationLoading$;
  }

  private getApplication(): void {
    this.application$.pipe(takeUntil(this.onDestroy$)).subscribe({
      next: (application: IApplication) => {
        this.application = application ?? {};
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  get productionDomain(): IApplicationDomain | undefined {
    return (this.application?.domains || []).find((data) => {
      return data.environment === this.eDomainType.PRODUCTION;
    });
  }
}
