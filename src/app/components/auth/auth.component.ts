import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl('daniel', Validators.required),
    password: new FormControl('password', Validators.required),
  });

  submit() {
    if (this.form.valid) {
      console.log('valid form');
    } else {
      console.log('invalid form');
    }
  }

}
