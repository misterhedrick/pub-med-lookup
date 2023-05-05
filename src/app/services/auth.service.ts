import { Injectable } from '@angular/core';
import { ILogin } from '../models/login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;
  constructor( private router: Router ) { }

  
}
