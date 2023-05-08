import {inject} from '@angular/core';
import { Router } from '@angular/router';

import {AuthService} from 'src/app/components/auth/auth.service';

export const AuthGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn) {
    return true;
  }

  // Redirect to the login page
  return router.parseUrl('/auth');
};