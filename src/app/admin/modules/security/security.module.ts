import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityRoutingModule } from './security-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SecurityComponent } from './components';

const components = [SecurityComponent];
const modules = [CommonModule, SecurityRoutingModule, SharedModule];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SecurityModule {}
