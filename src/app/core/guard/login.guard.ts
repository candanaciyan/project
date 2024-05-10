import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  let loginService = inject(LoginService);
  let router = inject(Router);
  
  if (loginService.loggedIn) {
    return true;
  } else {
   
    router.navigate(['/']);
    return false;
  }
};
