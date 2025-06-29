import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = authService.isLoggedIn();
  const path = route.routeConfig?.path;

  if (isLoggedIn) {
    if (path === 'login') {
      router.navigate(['/']);
      return false; // Prevent navigating to login if already logged in
    }
    return true; // Allow access to protected route
  } else {
    if (path !== 'login') {
      router.navigate(['/login']);
      return false; // Prevent access to protected route
    }
    return true; // Allow access to login page
  }
};

