import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../service/login.service';
import { APP_CONFIG } from '../../app.config';
import { catchError, switchMap, throwError } from 'rxjs';

export const urlInterceptor: HttpInterceptorFn = (req, next) => {
  let url = req.url;
  let headers = req.headers;
  let loginService = inject(LoginService);
  let toastrService = inject(ToastrService);
  let router = inject(Router);
  let appConfig: any = inject(APP_CONFIG);


  if (!url.startsWith('/assets/')) {
    url = appConfig.serverURL + url;
    headers = headers.append('Authorization', 'Bearer ' + loginService.token);
  }
//   interceptor icinde /assets/  baslamiyorsa diye koymamizin nedeni bu
// bunlar baslayan istekler proje icindeki assets dizini icinden geliyor cunku
// yani browser kendi projesi icinden bu bilgiyi okuyor oluyor


  let newReq = req.clone({
    url,
    headers,
  });
  return next(newReq).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.url != appConfig.serverURL + '/login'
        && error.status == 403) {
        // login işlemi yapılmıyor ve token hatası döndü ise tekrar giriş yapmayı dene
        return loginService.relogin().pipe(
          switchMap((token: any) => {
            toastrService.info("Logged again");
            headers = headers.set('Authorization', 'Bearer ' + loginService.token);
            newReq = newReq.clone({
              headers,
            });
            return next(newReq);
          }),
          catchError(error => {
            toastrService.error("Relogin failed");
            loginService.logout();
            router.navigateByUrl('/');
            return throwError(() => error);
          })
        );
      }
      return throwError(() => error);
    })
  );


};

