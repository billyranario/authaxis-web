import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, Subject, of, throwError } from 'rxjs';
import { catchError, map, shareReplay, takeUntil, tap } from 'rxjs/operators';
import { UserApiService } from '../services/api/admin/user-api.service';

@Injectable({
  providedIn: 'root',
})
export class LoadUserGuard {
  private onDestroy$ = new Subject();
  constructor(private router: Router, private userApiService: UserApiService) {}

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    if (this.userApiService.user$) {
      return of(true);
    }

    return this.userApiService.me().pipe(
      takeUntil(this.onDestroy$),
      catchError((response) => {
        this.router.navigate(['/auth/login']);
        return of(false);
      }),
      map((data: any) => {
        if (this.userApiService.user$) {
          return true;
        }

        this.router.navigate(['/auth/login']);
        return false;
      }),
    );
  }
}
