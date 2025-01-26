import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { CremService } from '../services/crem.service';

export const AuthInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const authService = inject(CremService);
  const accessToken = localStorage.getItem('access_token');

  // Clone the request to include the access token
  let clonedRequest = req;
  if (accessToken) {
    clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  return next(clonedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Attempt to refresh token
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          return authService.refreshToken(refreshToken).pipe(
            switchMap((tokens: any) => {
              // Store new tokens
              authService.storeTokens(
                tokens.access_token,
                tokens.refresh_token
              );
              // Retry the failed request with the new token
              const newRequest = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${tokens.access_token}`,
                },
              });
              return next(newRequest);
            }),
            catchError((refreshError) => {
              // Logout if token refresh fails
              authService.logout();
              return throwError(refreshError);
            })
          );
        } else {
          // Logout if no refresh token
          authService.logout();
        }
      }
      return throwError(error);
    })
  );
};
