import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, finalize, takeUntil } from 'rxjs';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CodeModel } from '@ngstack/code-editor';
import { Router } from '@angular/router';

// CONFIGS
import { CodeEditorConfig } from '../../../../../shared/configs/codeeditor.config';
import { DialogConfig, SnackBarConfig } from '../../../../../shared/configs';

// INTERFACES
import {
  EApplicationType,
  IApplication,
} from '../../interfaces/applications.interface';
import { ICodeEditorOptions } from '../../../../../shared/interfaces/codeeditor.interface';

// SERVICES
import { ApplicationApiService } from '../../../../../core/services/applications/application-api.service';
import { DialogService } from '../../../../../shared/services/ui/dialog.service';
import { UiConfirmComponent } from '../../../../../shared/components/ui-confirm/ui-confirm.component';

@Component({
  selector: 'application-view-settings',
  templateUrl: './application-view-settings.component.html',
  styleUrls: ['./application-view-settings.component.scss'],
})
export class ApplicationViewSettingsComponent implements OnInit, OnDestroy {
  form: FormGroup;
  application: IApplication;
  application$: Observable<IApplication>;
  applicationLoading$: Observable<boolean>;
  loading: boolean = false;
  loadingForm: boolean = false;
  theme: string = CodeEditorConfig.theme;
  options: ICodeEditorOptions = CodeEditorConfig.options;
  dependencies: string[] = CodeEditorConfig.dependencies;
  userMedataDataCodeModel: CodeModel = {
    language: 'json',
    uri: 'user_metadata.json',
    value: [
      `{`,
      `   "addressLine": "",`,
      `   "addressLine2": "",`,
      `   "countryCode": "",`,
      `   "postalCode": ""`,
      `}`,
    ].join('\n'),
  };
  appMedataDataCodeModel: CodeModel = {
    language: 'json',
    uri: 'app_metadata.json',
    value: [`{`, `   "customKey": "custom value"`, `}`].join('\n'),
  };
  applicationTypes = EApplicationType;
  private onDestroy$ = new Subject();

  constructor(
    private applicationApiService: ApplicationApiService,
    private dialogService: DialogService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.getDataFromService();
    this.getApplication();
    this.initForm();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

  onCodeChanged(json: string, type: string): void {
    this.form.get(type)?.setErrors({ invalidJSON: false });
    this.form.get(type)?.markAsTouched();
    this.form.get(type)?.updateValueAndValidity();

    try {
      JSON.parse(json);
    } catch (error) {
      this.form.get(type)?.setErrors({ invalidJSON: true });
    }
  }

  onDelete(): void {
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
          this.deleteApplication();
        }
      });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.loading = true;
      this.form
        .get('userMetadata')
        ?.patchValue(JSON.parse(this.userMedataDataCodeModel.value));
      this.form
        .get('appMetadata')
        ?.patchValue(JSON.parse(this.appMedataDataCodeModel.value));

      this.applicationApiService
        .update({
          id: this.application.id,
          payload: this.form.value,
        })
        .pipe(
          takeUntil(this.onDestroy$),
          finalize(() => (this.loading = false)),
        )
        .subscribe({
          next: (response) => {
            const { data } = response;
            this.applicationApiService.set(data);
            this.snackBar.open('Application successfully updated.', 'OK', {
              duration: SnackBarConfig.duration,
              panelClass: 'success',
            });
          },
          error: (err) => {
            const { error } = err;
            this.snackBar.open(
              error?.message ? error?.message : 'Error updating record',
              'Error',
              {
                duration: SnackBarConfig.duration,
              },
            );
          },
        });
    }
  }

  private getDataFromService(): void {
    this.application$ = this.applicationApiService.application$;
    this.applicationLoading$ = this.applicationApiService.applicationLoading$;
  }

  private getApplication(): void {
    this.application$.pipe(takeUntil(this.onDestroy$)).subscribe({
      next: (application: IApplication) => {
        this.application = application ?? {};
        this.initForm();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private initForm(): void {
    const {
      applicationName,
      applicationType,
      callbackUrls,
      crossOriginUrls,
      description,
      domain,
      metadata,
      settings,
    } = this.application;

    const applicationSettings = this.fb.group({
      throttle: [settings?.throttle ?? 60],
      redirectUrl: [settings?.redirect_url ?? ''],
      autoVerifyEmail: [settings?.auto_verify_email ?? true],
      enableCrossOrigin: [settings?.enable_cross_origin ?? true],
      userTokenValidity: [settings?.user_token_validity ?? 1],
    });

    const appMetadata = JSON.stringify(metadata?.appMetadata ?? {}, null, 2);
    const userMetadata = JSON.stringify(metadata?.userMetadata ?? {}, null, 2);

    this.form = this.fb.group({
      applicationName: [applicationName ?? '', Validators.required],
      applicationType: [
        applicationType ?? EApplicationType.WEB,
        Validators.required,
      ],
      callbackUrls: [(callbackUrls?.urls || []).join(',')],
      crossOriginUrls: [(crossOriginUrls?.urls || []).join(',')],
      description: [description ?? ''],
      domain: [domain ?? '', Validators.required],
      appMetadata: [appMetadata],
      userMetadata: [userMetadata],
      settings: applicationSettings,
    });

    // Set Editor value
    this.appMedataDataCodeModel.value = appMetadata;
    this.userMedataDataCodeModel.value = userMetadata;
  }

  private deleteApplication(): void {
    this.loadingForm = true;
    this.applicationApiService
      .delete(this.application.id)
      .pipe(
        takeUntil(this.onDestroy$),
        finalize(() => {
          this.loadingForm = false;
          this.router.navigateByUrl('/admin/applications');
        }),
      )
      .subscribe({
        next: (response) => {
          const { data, message } = response;
          this.snackBar.open(message, 'OK', {
            duration: SnackBarConfig.duration,
            panelClass: 'success',
          });
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
        },
      });
  }

  get applicationNameControl(): AbstractControl | null {
    return this.form.get('applicationName');
  }

  get domainControl(): AbstractControl | null {
    return this.form.get('domain');
  }

  get applicationTypeControl(): AbstractControl | null {
    return this.form.get('applicationType');
  }

  get enableCrossOriginControl(): AbstractControl | null {
    return this.form.get('settings.enableCrossOrigin');
  }

  get userMetaDataControl(): AbstractControl | null {
    return this.form.get('userMetadata');
  }

  get appMetaDataControl(): AbstractControl | null {
    return this.form.get('appMetadata');
  }
}
