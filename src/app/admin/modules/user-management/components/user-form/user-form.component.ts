import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';

// UTILS
import {
  generatePassword,
  passwordConfirmationValidator,
} from 'src/app/shared/utils/password.util';

// SERVICES
import { UserApiService } from 'src/app/core/services/users/user-api.service';
import { ToastService } from 'src/app/shared/services/ui/toast.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit, OnDestroy {
  @Output()
  userCreatedEvent: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;
  loading: boolean = false;

  private onDestroy$ = new Subject();

  constructor(
    private dialogRef: MatDialogRef<UserFormComponent>,
    private fb: FormBuilder,
    private userApiService: UserApiService,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

  onSelectApplication(tenantId: string): void {
    this.tenantIdControl?.patchValue(tenantId);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.loading = true;
      this.userApiService
        .create(this.form.value)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe({
          next: (response: any) => {
            this.userCreatedEvent.emit(response);
            this.toastService.show({
              title: 'User successfully created!',
              icon: 'success',
            });
            this.dialogRef.close(response);
          },
          error: (err) => {
            this.loading = false;
            const { error } = err;

            this.toastService.show({
              title: error?.message ? error?.message : 'Error updating record',
              icon: 'error',
            });
          },
        });
    }
  }

  onCloseDialog(): void {
    this.dialogRef.close();
  }

  onGeneratePassword(): void {
    const generatedPassword = generatePassword();
    this.passwordControl?.patchValue(generatedPassword);
    this.passwordConfirmationControl?.patchValue(generatedPassword);
  }

  private initForm(): void {
    this.form = this.fb.group(
      {
        tenantId: [null, [Validators.required]],
        firstname: [null, [Validators.required]],
        lastname: [null, [Validators.required]],
        email: [null, [Validators.email, Validators.required]],
        password: [null, [Validators.required]],
        password_confirmation: [null, [Validators.required]],
      },
      { validator: passwordConfirmationValidator },
    );
  }

  get tenantIdControl(): AbstractControl | null {
    return this.form.get('tenantId');
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

  get passwordConfirmationControl(): AbstractControl | null {
    return this.form.get('password_confirmation');
  }
}
