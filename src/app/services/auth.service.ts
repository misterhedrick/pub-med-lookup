import { Injectable } from '@angular/core';
import { Auth, authState, signOut, User, signInWithPopup, signInWithEmailAndPassword } from '@angular/fire/auth';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { traceUntilFirst } from '@angular/fire/performance';
import { ILogin } from 'src/app/models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly userDisposable: Subscription|undefined;
  public readonly user: Observable<User | null> = EMPTY;

  isLoggedIn = false;
  showLoginButton = false;
  showLogoutButton = false;
  
  constructor(private auth: Auth) { 
    if (auth) {
      this.user = authState(this.auth);
      this.userDisposable = authState(this.auth).pipe(
        traceUntilFirst('auth'),
        map(u => !!u)
      ).subscribe(isLoggedIn => {
        this.showLoginButton = !isLoggedIn;
        this.showLogoutButton = isLoggedIn;
        this.isLoggedIn = true;
      });
    }
  }

  async login(email: string, password: string) {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  async logout() {
    this.isLoggedIn = false;
    return await signOut(this.auth);
  }
  
}
