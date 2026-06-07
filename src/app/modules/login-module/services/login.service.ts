import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface LoginPayload {
  email: string;
  password: string;
}

@Injectable()
export class LoginService {
  private readonly http = inject(HttpClient);

  private readonly loginUrl = environment.SERVER_API + '/user/login';

  login(payload: LoginPayload): Observable<unknown> {
    return this.http.post<unknown>(this.loginUrl, payload);
  }
}
