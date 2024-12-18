import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpRequestInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const headers = req.headers.set('Content-Type', 'application/json');
    // const authReq = req.clone({ headers });

    const authReq = req.clone({ withCredentials: true });
    return next.handle(authReq);
  }
}
