// interceptors/auth.interceptor.ts
import { inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionstorageService } from '../services/sessionstorage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly sessionstorageService = inject(SessionstorageService);

  private skipUrls = ['login'];

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check if URL should be skipped
    if (this.shouldSkip(req.url)) {
      return next.handle(req); // Skip adding token
    }
    const token = this.sessionstorageService.getItem<string>('user_auth_token');
    if (token) {
      const authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }

  private shouldSkip(url: string): boolean {
    return this.skipUrls.some(skip => url.includes(skip));
  }
}
