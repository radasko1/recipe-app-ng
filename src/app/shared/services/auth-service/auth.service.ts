import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  /**
   * Whether user has logged (authenticated)
   */
  isAuthenticated(): Observable<boolean> {
    const url = `${environment.SERVER_ORIGIN}/user/authenticated`;
    return this.http.get<boolean>(url);
  }
}
