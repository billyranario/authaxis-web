import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { PipeModule } from './pipes/pipe.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

// COMPONENTS
import {
  UiConfirmComponent,
  UiIconComponent,
  UiTenantDropdownComponent,
} from './components';
import { UiDropdownComponent } from './components/ui-dropdown/ui-dropdown.component';

// DIRECTIVES
import { DropdownContentProjectionDirective } from './directives';

// SERVICES
import { DialogService } from './services';

const components = [
  UiIconComponent,
  UiDropdownComponent,
  UiConfirmComponent,
  UiTenantDropdownComponent,
];
const directives = [DropdownContentProjectionDirective];
const services = [DialogService];
const angularModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  MaterialModule,
  PipeModule,
  SweetAlert2Module,
];

@NgModule({
  declarations: [...components, ...directives],
  imports: [...angularModules],
  exports: [...components],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [...services],
})
export class SharedModule {}
