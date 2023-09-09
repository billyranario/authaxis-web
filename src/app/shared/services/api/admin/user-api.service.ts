import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { EnvironmentService } from '../../environment.service';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private _user = new BehaviorSubject<any>(<any>null); // TODO: create User Interface

  constructor(
    private environmentService: EnvironmentService,
    private http: HttpClient,
  ) {}

  me(): Observable<any> {
    return this.http.get(`${this.environmentService.apiUrl}/auth/me`).pipe(
      map((user: any) => {
        const { data } = user;
        if (data) {
          this._user.next(data);
        }
      }),
    );
  }

  get user$(): any {
    return this._user.value;
  }
}
