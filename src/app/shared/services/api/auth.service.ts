import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { EnvironmentService } from '../environment.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements HttpInterceptor {
  constructor(
    private environmentService: EnvironmentService,
    private router: Router,
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const authToken = this.environmentService.getToken();
    if (authToken) {
      const authReq = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + authToken),
      });

      return next.handle(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.router.navigateByUrl('auth/login');
          }
          return throwError(() => error.message);
        }),
      );
    } else {
      return next.handle(request);
    }
  }
}
