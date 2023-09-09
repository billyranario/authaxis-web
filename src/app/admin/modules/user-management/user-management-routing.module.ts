import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  UsersComponent,
  UserComponent,
  UserDetailsComponent,
  UserHistoryComponent,
  UserPermissionsComponent,
  UserRolesComponent,
  RolesComponent,
  PermissionsComponent,
} from './components';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'user',
    component: UserComponent,
    children: [
      {
        path: ':id/details',
        component: UserDetailsComponent,
      },
      {
        path: ':id/history',
        component: UserHistoryComponent,
      },
      {
        path: ':id/permissions',
        component: UserPermissionsComponent,
      },
      {
        path: ':id/roles',
        component: UserRolesComponent,
      },
    ],
  },
  {
    path: 'roles',
    component: RolesComponent,
  },
  {
    path: 'permissions',
    component: PermissionsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagementRoutingModule {}
