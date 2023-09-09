import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ActivityComponent,
} from './components';

const routes: Routes = [
  {
    path: '',
    component: ActivityComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivityRoutingModule {}
