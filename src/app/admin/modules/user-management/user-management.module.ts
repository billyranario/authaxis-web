import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CodeEditorModule } from '@ngstack/code-editor';
import { SharedDirectiveModule } from 'src/app/shared/directives/directive.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { PipeModule } from 'src/app/shared/pipes/pipe.module';

import {
  UsersComponent,
  UserRolesComponent,
  UserPermissionsComponent,
  UserHistoryComponent,
  UserFormComponent,
  UserDetailsComponent,
  UserComponent,
  RolesComponent,
  PermissionsComponent,
} from './components';

const components = [
  UsersComponent,
  UserRolesComponent,
  UserPermissionsComponent,
  UserHistoryComponent,
  UserFormComponent,
  UserDetailsComponent,
  UserComponent,
  RolesComponent,
  PermissionsComponent,
];
const modules = [
  CommonModule,
  ReactiveFormsModule,
  CodeEditorModule.forChild(),
  UserManagementRoutingModule,
  SharedModule,
  SharedDirectiveModule,
  PipeModule,
  MaterialModule,
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components],
  schemas: [NO_ERRORS_SCHEMA],
})
export class UserManagementModule {}
