import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, public authService: AuthService) {}

  canActivate(): boolean {
    if (!this.authService.loggedIn) {
      this.router.navigate(['/auth']);
      return false;
    } else {
      return true;
    }
  }
}
