import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const tokenGuard: CanActivateFn = (route, state) => {
  if(localStorage.getItem('token')) {
    return true;
  }
  
  const router = inject(Router);
  return router.navigate(['bo/login'])
};