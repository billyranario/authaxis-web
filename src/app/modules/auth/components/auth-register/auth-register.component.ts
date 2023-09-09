import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { SnackBarConfig } from 'src/app/shared/configs';
import { Router } from '@angular/router';

// Services
import { AuthApiService } from 'src/app/shared/services/api/admin/auth-api.service';

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.scss'],
})
export class AuthRegisterComponent implements OnInit, OnDestroy {
  form: FormGroup;
  loading: boolean = false;
  private onDestroy$ = new Subject();

  constructor(
    private authApiService: AuthApiService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.loading = true;
      this.authApiService
        .register(this.form.value)
        .pipe(
          takeUntil(this.onDestroy$),
          finalize(() => (this.loading = false)),
        )
        .subscribe({
          next: (data: { user: string }) => {
            const { user } = data;
            if (user) {
              this.snackBar.open('Account successfully created.', '', {
                duration: SnackBarConfig.duration,
                panelClass: 'success',
              });
              this.router.navigate(['auth/login']);
            }
          },
          error: (err) => {
            const { error } = err;
            this.snackBar.open(
              error?.message
                ? error?.message
                : 'Unable to register. Please try again later.',
              'OK',
              {
                duration: SnackBarConfig.duration,
              },
            );
          },
        });
    }
  }

  private initForm(): void {
    this.form = this.fb.group(
      {
        firstname: [null, [Validators.required]],
        lastname: [null, [Validators.required]],
        email: [null, [Validators.email, Validators.required]],
        password: [null, [Validators.required]],
        password_confirmation: [null, [Validators.required]],
        remember: [false],
      },
      { validator: this.passwordConfirmationValidator },
    );
  }

  private passwordConfirmationValidator(
    control: AbstractControl,
  ): { [key: string]: boolean } | null {
    const passwordControl = control.get('password');
    const confirmPasswordControl = control.get('password_confirmation');

    if (
      passwordControl &&
      confirmPasswordControl &&
      passwordControl.value !== confirmPasswordControl.value
    ) {
      return { passwordMismatch: true };
    }
    return null;
  }

  get firstnameControl(): AbstractControl | null {
    return this.form.get('firstname');
  }

  get lastnameControl(): AbstractControl | null {
    return this.form.get('lastname');
  }

  get emailControl(): AbstractControl | null {
    return this.form.get('email');
  }

  get passwordControl(): AbstractControl | null {
    return this.form.get('password');
  }
}
