import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetStartedRoutingModule } from './get-started-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { GetStartedComponent } from './components';

const components = [GetStartedComponent];
const modules = [CommonModule, GetStartedRoutingModule, SharedModule];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components],
  schemas: [NO_ERRORS_SCHEMA],
})
export class GetStartedModule {}
