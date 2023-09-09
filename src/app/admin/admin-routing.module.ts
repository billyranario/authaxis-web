import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'applications', // change to getting-started when page is done develop
        pathMatch: 'full',
      },
      {
        path: 'getting-started',
        loadChildren: () =>
          import('./modules/get-started/get-started.module').then(
            (m) => m.GetStartedModule,
          ),
      },
      {
        path: 'activity',
        loadChildren: () =>
          import('./modules/activity/activity.module').then(
            (m) => m.ActivityModule,
          ),
      },
      {
        path: 'applications',
        loadChildren: () =>
          import('./modules/applications/applications.module').then(
            (m) => m.ApplicationsModule,
          ),
      },
      {
        path: 'authentication',
        loadChildren: () =>
          import('./modules/authentication/authentication.module').then(
            (m) => m.AuthenticationModule,
          ),
      },
      {
        path: 'user-management',
        loadChildren: () =>
          import('./modules/user-management/user-management.module').then(
            (m) => m.UserManagementModule,
          ),
      },
      {
        path: 'security',
        loadChildren: () =>
          import('./modules/security/security.module').then(
            (m) => m.SecurityModule,
          ),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./modules/settings/settings.module').then(
            (m) => m.SettingsModule,
          ),
      },
    ],
  },
  { path: '**', redirectTo: '/admin/getting-started', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
