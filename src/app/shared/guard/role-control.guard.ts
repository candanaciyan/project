import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../../core/service/login.service';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';

export function roleControlGuard(role: string): CanActivateFn {
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    let service = inject(LoginService);
    let toastr = inject(ToastrService);
    let router = inject(Router);
    let result = service.userHasRole(role);
    //logserv.rollerde bizim gonderdigimiz roles arrayindeki herhangi biri var mi diye bakiyoruz
    // neyi arattiriyoruz rolu aliyorum o rolu benim gonderdigim roles arrayindeki her rolle tek tek
    // kiyaslayip ordan esit olani var mi diye baktiriyorum
    // ilk buldugunu geri donduruyor
    // bulamazsa geriye undefined donduruyor
    // bende hata donduruyorum mesaj olarak
    

    if (!result) {
      router.navigate(['./menu']);
      toastr.error(
        'You are not authorized to enter this page.',
        'Access Denied !!',
        {
          timeOut: 1500,
        }
      );
    }
    return result;
  };
}
