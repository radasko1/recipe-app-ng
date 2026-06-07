import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface LoginPayload {
  email: string;
  password: string;
}

@Injectable()
export class LoginService {
  private readonly loginUrl = environment.SERVER_API + '/user/login';

  constructor(private readonly http: HttpClient) {}

  login(payload: LoginPayload): Observable<unknown> {
    return this.http.post<unknown>(this.loginUrl, payload);
  }
}
