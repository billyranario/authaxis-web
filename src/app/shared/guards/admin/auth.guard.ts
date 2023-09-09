import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChildFn,
} from '@angular/router';
import { EnvironmentService } from '../../services/environment.service';

@Injectable({
  providedIn: 'root',
})
class AuthGuard {
  constructor(
    private environmentService: EnvironmentService,
    private router: Router,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    const token = this.environmentService.getToken();
    if (!token) {
      // Redirect to login page
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
}

export const IsAdminGuard: CanActivateChildFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): boolean => {
  return inject(AuthGuard).canActivate(route, state);
};
