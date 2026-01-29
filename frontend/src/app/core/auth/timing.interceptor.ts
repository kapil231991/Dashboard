import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from "@angular/common/http";
import { catchError, tap, throwError } from "rxjs";

export const timingInterceptor: HttpInterceptorFn = (req, next) => {
  const start = performance.now();

  return next(req).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        console.log('Timing Interceptor Invoked');
        const duration = Math.round(performance.now() - start);
        console.log(
          `[HTTP] ${req.method} ${req.url} -> ${event.status} in ${duration}ms`
        );
      }
    }),
    catchError((error: HttpErrorResponse) => {
      const duration = Math.round(performance.now() - start);
      console.error(
        `[HTTP] ${req.method} ${req.url} -> ERROR in ${duration}ms`,
        error
      );
      return throwError(() => error);
    })
  );
};
