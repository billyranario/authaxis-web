import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// Services
import { EnvironmentService } from '../../../shared/services/environment.service';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private _userLoading = new BehaviorSubject<boolean>(<boolean>false);

  constructor(
    private environmentService: EnvironmentService,
    private http: HttpClient,
  ) {}

  get(params: { [param: string]: string | string[] }): Observable<any> {
    return this.http.get(`${this.environmentService.adminApiUrl}/users`, {
      params,
    });
  }

  getById(data: {
    id: number;
    params?: { [param: string]: string | string[] };
  }): Observable<any> {
    const { id, params } = data;
    this._userLoading.next(true);

    return this.http
      .get(`${this.environmentService.adminApiUrl}/users/${id}`, {
        params,
      })
      .pipe(tap(() => this._userLoading.next(false)));
  }

  create(payload: any): Observable<any> {
    return this.http.post(
      `${this.environmentService.adminApiUrl}/users`,
      payload,
    );
  }

  update(params: { payload: any; id: number }): Observable<any> {
    const { payload, id } = params;

    return this.http.put(
      `${this.environmentService.adminApiUrl}/users/${id}`,
      payload,
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(
      `${this.environmentService.adminApiUrl}/users/${id}`,
    );
  }

  block(params: { tenantId: string; userIds: number[] }): Observable<any> {
    return this.http.post(
      `${this.environmentService.adminApiUrl}/users/block`,
      params,
    );
  }

  unblock(params: { tenantId: string; userIds: number[] }): Observable<any> {
    return this.http.post(
      `${this.environmentService.adminApiUrl}/users/unblock`,
      params,
    );
  }
}
