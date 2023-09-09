import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SettingsComponent } from './components';

const components = [SettingsComponent];
const modules = [CommonModule, SettingsRoutingModule, SharedModule];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SettingsModule {}
