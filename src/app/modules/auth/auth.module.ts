import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { PipeModule } from 'src/app/shared/pipes/pipe.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedDirectiveModule } from 'src/app/shared/directives/directive.module';
import {
  AuthComponent,
  AuthLoginComponent,
  AuthRegisterComponent,
  AuthForgotComponent,
} from './components';

const components = [
  AuthComponent,
  AuthLoginComponent,
  AuthRegisterComponent,
  AuthForgotComponent,
];
const modules = [
  CommonModule,
  AuthRoutingModule,
  MaterialModule,
  PipeModule,
  ReactiveFormsModule,
  SharedDirectiveModule,
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AuthModule {}
