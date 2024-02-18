import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

interface UserCredentials {
  email: string;
  password: string;
}

@Injectable()
export class UserRegistrationService {
  constructor(private readonly http: HttpClient) {}

  /**
   * Register User
   * @param user
   */
  public registerUser(user: UserCredentials) {
    const url = `${environment.SERVER_ORIGIN}/user/signup`;
    return this.http.post(url, { user });
  }
}
