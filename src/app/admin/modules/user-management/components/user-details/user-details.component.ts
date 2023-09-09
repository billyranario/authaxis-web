import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CodeModel } from '@ngstack/code-editor';
import { Subject } from 'rxjs';
import { CodeEditorConfig, JSONValidator } from 'src/app/shared/configs';
import { ICodeEditorOptions } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  form: FormGroup;
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
      `   "countryCode": "US",`,
      `   "postalCode": "9000-200"`,
      `}`,
    ].join('\n'),
  };
  appMedataDataCodeModel: CodeModel = {
    language: 'json',
    uri: 'app_metadata.json',
    value: [`{`, `   "customKey": "custom value"`, `}`].join('\n'),
  };

  private onDestroy$ = new Subject();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
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
      this.form.get(type)?.patchValue(json);
    } catch (error) {
      this.form.get(type)?.setErrors({ invalidJSON: true });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    }
    try {
    } catch (error) {
      console.error(error);
    }
  }
  testaaa(data: any): void {
    console.log(data);
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      user_metadata: [null, JSONValidator],
      app_metadata: [null, JSONValidator],
    });
  }

  get nameControl(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get emailControl(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get userMetaDataControl(): FormControl {
    return this.form.get('user_metadata') as FormControl;
  }

  get appMetaDataControl(): FormControl {
    return this.form.get('app_metadata') as FormControl;
  }

  get hasInvalidInput(): boolean {
    return (
      this.nameControl.invalid ||
      this.emailControl.invalid ||
      this.userMetaDataControl.invalid ||
      this.appMetaDataControl.invalid
    );
  }
}
