import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvironmentService } from '../../environment.service';
import { IAuth, IAuthRegister } from 'src/app/shared/interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(
    private environmentService: EnvironmentService,
    private http: HttpClient,
  ) {}

  login(params: IAuth): Observable<any> {
    return this.http.post(
      `${this.environmentService.apiUrl}/auth/login`,
      params,
    );
  }

  register(params: IAuthRegister): Observable<any> {
    return this.http.post(
      `${this.environmentService.apiUrl}/auth/register`,
      params,
    );
  }
}
