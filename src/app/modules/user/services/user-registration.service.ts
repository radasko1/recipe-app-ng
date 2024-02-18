import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable()
export class UserRegistrationService {
  constructor(private readonly http: HttpClient) {}

  // TODO any type
  public registerUser(user: any) {
    const url = `${environment.SERVER_ORIGIN}/user/signup`;
    return this.http.post(url, { user });
  }
}
