import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationViewApiComponent, ApplicationViewComponent, ApplicationViewSettingsComponent, ApplicationsComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: ApplicationsComponent,
  },
  {
    path: ':tenantId',
    component: ApplicationViewComponent,
    children: [
      {
        path: 'settings',
        component: ApplicationViewSettingsComponent,
      },
      {
        path: 'api',
        component: ApplicationViewApiComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationsRoutingModule {}
