import { HttpInterceptorFn } from '@angular/common/http';

export const customHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  return next(
    req.clone({
      setHeaders: {
        'Custom-header-0': '---',
      },
    })
  );
};
