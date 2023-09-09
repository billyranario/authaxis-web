import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';
import { ApplicationsRoutingModule } from './applications-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedDirectiveModule } from 'src/app/shared/directives/directive.module';
import { PipeModule } from 'src/app/shared/pipes/pipe.module';
import { CodeEditorModule } from '@ngstack/code-editor';
import {
  ApplicationsComponent,
  ApplicationFormComponent,
  ApplicationViewComponent,
  ApplicationViewSettingsComponent,
  ApplicationViewApiComponent,
  ApplicationApiComponent,
} from './components';

const components = [
  ApplicationsComponent,
  ApplicationFormComponent,
  ApplicationViewComponent,
  ApplicationViewSettingsComponent,
  ApplicationViewApiComponent,
  ApplicationApiComponent,
];
const modules = [
  CommonModule,
  MaterialModule,
  ReactiveFormsModule,
  ApplicationsRoutingModule,
  SharedModule,
  SharedDirectiveModule,
  PipeModule,
  CodeEditorModule,
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ApplicationsModule {}
