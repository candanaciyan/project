import { Component } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = this.fb.nonNullable.group({
    email: ['', Validators.email],
    password: '',
  });

  constructor(
    private loginService: LoginService,
    private router: Router,
    public route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService,

  ) {
  }

  login() {
    //deger okuma
    let email = this.loginForm.get('email')!.value;
    let password = this.loginForm.get('password')!.value;
    this.loginService.login(email, password).subscribe({
      next: () => {
        this.toastr.success('Login Successful', '', { timeOut: 1000 });
        this.router.navigate(['/menu']);

      },
      error: (err) => {
        this.toastr.error('Login Failed');
        this.loginForm.patchValue({ password: '' });

      }
    });
  }


}



