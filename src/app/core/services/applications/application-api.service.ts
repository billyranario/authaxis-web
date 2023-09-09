import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { EnvironmentService } from 'src/app/shared/services/environment.service';
import { IApplication } from 'src/app/admin/modules/applications';

@Injectable({
  providedIn: 'root',
})
export class ApplicationApiService {
  private _application = new BehaviorSubject<any>(<any>null);
  private _applicationLoading = new BehaviorSubject<boolean>(<boolean>false);

  constructor(
    private environmentService: EnvironmentService,
    private http: HttpClient,
  ) {}

  get(params: { [param: string]: string | string[] }): Observable<any> {
    return this.http.get(
      `${this.environmentService.adminApiUrl}/applications`,
      { params },
    );
  }

  getList(params: { [param: string]: string | string[] }): Observable<any> {
    return this.http.get(
      `${this.environmentService.adminApiUrl}/applications/list`,
      { params },
    );
  }

  getById(data: {
    id: string;
    params?: { [param: string]: string | string[] };
  }): Observable<any> {
    const { id, params } = data;
    this._applicationLoading.next(true);

    return this.http
      .get(`${this.environmentService.adminApiUrl}/applications/${id}`, {
        params,
      })
      .pipe(
        tap((response: any) => {
          this._application.next(response.data ?? {});
          this._applicationLoading.next(false);
        }),
      );
  }

  create(payload: any): Observable<any> {
    return this.http.post(
      `${this.environmentService.adminApiUrl}/applications`,
      payload,
    );
  }

  update(params: { payload: any; id: string }): Observable<any> {
    const { payload, id } = params;
    return this.http.put(
      `${this.environmentService.adminApiUrl}/applications/${id}`,
      payload,
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(
      `${this.environmentService.adminApiUrl}/applications/${id}`
    );
  }

  set(application: IApplication): void {
    this._application.next(application ?? {});
  }

  get application$(): Observable<any> {
    return this._application.asObservable();
  }

  get applicationLoading$(): Observable<boolean> {
    return this._applicationLoading.asObservable();
  }
}
