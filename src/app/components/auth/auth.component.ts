import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl('user@gmail.com', Validators.required),
    password: new FormControl('password', Validators.required),
  });

  constructor(private authService: AuthService) {}

  submit() {
    console.log('email: ', this.email, ' password: ', this.password);
  }

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

}
