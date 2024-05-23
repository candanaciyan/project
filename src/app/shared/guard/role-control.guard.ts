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
