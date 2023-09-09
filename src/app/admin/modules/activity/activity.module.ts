import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityRoutingModule } from './activity-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import {
  ActivityComponent
} from './components';

const components = [
  ActivityComponent,
];
const modules = [CommonModule, ActivityRoutingModule, SharedModule];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ActivityModule {}
