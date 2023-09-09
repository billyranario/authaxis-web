import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

// CONFIGS
import { SnackBarConfig } from 'src/app/shared/configs';

// INTERFACES
import { EApplicationType } from '../../interfaces/applications.interface';

// SERVICES
import { ApplicationApiService } from '../../../../../core/services/applications/application-api.service';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss'],
})
export class ApplicationFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  loading: boolean = false;

  applicationTypes = EApplicationType;
  private onDestroy$ = new Subject();

  constructor(
    private applicationApiService: ApplicationApiService,
    private dialogRef: MatDialogRef<ApplicationFormComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

  onCloseDialog(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.loading = true;
      this.applicationApiService
        .create(this.form.value)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe({
          next: (response: any) => {
            this.snackBar.open('Account successfully created.', '', {
              duration: SnackBarConfig.duration,
              panelClass: 'success',
            });
            this.dialogRef.close(response);
          },
          error: (err) => {
            this.loading = false;
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

  private initForm(): void {
    this.form = this.fb.group({
      applicationName: ['', Validators.required],
      domain: ['', Validators.required],
      description: [''],
      applicationType: [EApplicationType.WEB, Validators.required],
      callbackApis: [''],
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
}
