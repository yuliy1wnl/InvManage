// src/app/auth.interceptor.ts
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * AuthInterceptor function for Angular 17+ standalone apps.
 * Automatically attaches JWT from localStorage to all outgoing HTTP requests.
 */
export const authInterceptor = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  
  // Get JWT token from localStorage
  const token = localStorage.getItem('jwt_token');

  // If token exists, clone the request and add Authorization header
  if (token && !req.url.includes('/api/auth/')) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Pass the request to the next handler
  return next(req);
};
