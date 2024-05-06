import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../service/login.service';
import { APP_CONFIG } from '../../app.config';
import { catchError, switchMap, throwError } from 'rxjs';
import { UserService } from '../../shared/service/user.service';

export const urlInterceptor: HttpInterceptorFn = (req, next) => {
  let url = req.url;
  let headers = req.headers;
  let loginService = inject(LoginService);
  let userService = inject(UserService);
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

  //   interceptor icinde bu tokenin eklenmesi islemini yapalim simdi
  //   headerlarin icerisine tokeni ekliyoruz token nerde loginservice te
  // ona erisemiyoruz orasi fonksiyon 
  // class olsaydi classin const. ina injection la loginservice classini yazip burdan erisebilirdim
  // const. parametresi olmadan erisme yontemim var o da
  // inject diye bir metot tanimlanmis onu cagirdigimizda 
  // bu bize angular icinde loginservice olarak saklanmis classin referansini veriyor
  // onun uzerinden de tokeni alip loginService.token headrin icine ekliyoruz bearer bosluk unutma
  // jwtauthorizationfilter classiyla baglantisi var buranin ona bak oturmadiysa
  // headerin icine tokeni koyduk yani
  // deniyecegiz simdi bunun icin yazilimilan ver component ts.
  // submit butonunda
  // girilen butun degerleri okumayi gormustuk
  // simdi burda sunucuya istekte bulunup bunlari veri tabanina kaydedilmesini saglamamiz lazim
  // bunun icin benim bir tane service e ihtiyacim var
  // bu service classini nereye tanimliyacagiz

};

