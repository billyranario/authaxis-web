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
import { EnvironmentService } from 'src/app/shared/services/environment.service';
import { AuthApiService } from 'src/app/shared/services/api/admin/auth-api.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
})
export class AuthLoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  loading: boolean = false;
  private onDestroy$ = new Subject();

  constructor(
    private authApiService: AuthApiService,
    private environmentService: EnvironmentService,
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
        .login(this.form.value)
        .pipe(
          takeUntil(this.onDestroy$),
          finalize(() => (this.loading = false)),
        )
        .subscribe({
          next: (data: { token: string }) => {
            const { token } = data;
            if (token) {
              this.environmentService.setToken(token);
              this.router.navigate(['admin/applications']);
            }
          },
          error: (err) => {
            const { error } = err;
            this.snackBar.open(
              error?.message
                ? error?.message
                : 'Unable to login. Please try again later.',
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
    this.form = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      remember: [false],
    });
  }

  get emailControl(): AbstractControl | null {
    return this.form.get('email');
  }

  get passwordControl(): AbstractControl | null {
    return this.form.get('password');
  }
}
