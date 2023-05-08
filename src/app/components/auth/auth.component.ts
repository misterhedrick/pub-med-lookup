import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/components/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl('user@gmail.com', Validators.required),
    password: new FormControl('password123@', Validators.required),
  });

  constructor(private authService: AuthService, private router: Router) {}

  submit() {
    console.log('email: ', this.email?.value, ' password: ', this.password?.value);
    this.authService.login(this.email?.value, this.password?.value).then((response) => {
      console.log('login response: ', response);
      this.router.navigate(['/admin']);
    });
  }

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

}
