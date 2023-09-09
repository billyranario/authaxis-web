import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminComponent } from './components';
import { HttpClientModule } from '@angular/common/http';

const components = [AdminComponent];
const modules = [
  CommonModule,
  HttpClientModule,
  RouterModule,
  AdminRoutingModule,
  SharedModule,
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AdminModule {}
