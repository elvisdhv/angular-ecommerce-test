import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const globalErrorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(`Metodo: ${req.method}`);
  console.log(`Peticion enviada: ${req.url}`);
  if (req.method === 'POST') {
    console.log(`POST:`);
    console.log(req.body);
  }
  if (req.method === 'PUT') {
    console.log(`PUT:`);
    console.log(req.body);
  }
  if (req.method === 'PATCH') {
    console.log(`PATCH:`);
    console.log(req.body);
  }
  return next(req).pipe(
    catchError((error) => {
      return throwError(() => error);
    })
  );
};
