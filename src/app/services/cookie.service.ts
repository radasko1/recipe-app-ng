import { Injectable } from '@angular/core';

interface CookieOptions {
  expires?: Date;
  path?: string;
  domain?: string;
  sameSite?: 'Strict' | 'Lax' | 'None';
}

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  /**
   * Sets a cookie.
   * @param name The name of the cookie.
   * @param value The value of the cookie.
   * @param options Optional options for the cookie.
   */
  set(name: string, value: string, options?: CookieOptions): void {
    let cookie = `${name}=${value};`;

    if (options && options.expires) {
      cookie += `;expires=${options.expires}`;
    }

    if (options && options.path) {
      cookie += `;path=${options.path}`;
    }

    document.cookie = cookie;
  }

  /**
   * Gets a cookie
   * @param name The name of the cookie.
   * @returns The value of the cookie, or null if the cookie does not exist.
   */
  get(name: string): string | null {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  }

  /**
   * Deletes a cookie
   * @param name The name of the cookie.
   */
  delete(name: string): void {
    this.set(name, '', {
      expires: new Date(0),
    });
  }
}
