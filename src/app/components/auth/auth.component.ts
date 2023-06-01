import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/components/auth/auth.service';
import { AdminService } from '../admin/admin.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl('misterhedrick@gmail.com', Validators.required),
    password: new FormControl('22vwOdS&r234', Validators.required),
  });

  constructor(private authService: AuthService, private adminService: AdminService, private router: Router) {
    if(!this.authService.canLogin) {
      this.authService.enteredSeq = '';
      this.router.navigate(['']);
    }
  }

  submit() {
    this.authService.login(this.email?.value, this.password?.value).then((response) => {
      this.adminService.setFolderCollection(response.user.uid);
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
