import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface UserCredentials {
  email: string;
  password: string;
}

const authCookieName = 'SESSIONID';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  /**
   * Login User.
   * Using credentials to get secured cookie in response header
   * @param credentials
   */
  loginUser(credentials: UserCredentials): Observable<string> {
    const url = `${environment.SERVER_ORIGIN}/user/authenticate/login`;
    return this.http.post<string>(
      url,
      {
        email: credentials.email,
        password: credentials.password,
      },
      { withCredentials: true }
    );
  }

  /**
   * Whether user has admin permission
   */
  hasAdminPermission(): Observable<boolean> {
    const url = `${environment.SERVER_ORIGIN}/user/authorization/has-admin-access`;
    return this.http.get<boolean>(url);
  }
}
