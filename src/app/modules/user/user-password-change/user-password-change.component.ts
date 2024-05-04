import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../../core/service/login.service';
import { UserService } from '../../../shared/service/user.service';
import { AbstractControl, FormBuilder, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-password-change',
  templateUrl: './user-password-change.component.html',
  styleUrl: './user-password-change.component.scss'
})
export class UserPasswordChangeComponent {

  passwordForm = this.fb.nonNullable.group({
    email: { value: this.loginService.email, disabled: true },
    oldPassword: "",					
    newPassword: ["", [ Validators.required, Validators.minLength(3),Validators.pattern(/admin/)] ],								
    passwordVerification: "",								
    }, {validators: [this.passwordValidationMatchValidator('newPassword', 'passwordVerification')]});								
    

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private toastr: ToastrService,
    private userService: UserService,
    private loginService: LoginService,
    private fb: FormBuilder,
  ) {}
  submit() {
    let oldPassword = this.passwordForm.get('oldPassword')!.value;
    let newPassword = this.passwordForm.get('newPassword')!.value;
    this.userService.changePassword({oldPassword, newPassword }).subscribe({
      next: (result) => {
        console.log(result);
        this.toastr.info("Şifre değiştirilmiştir.");
      },
      error: (err) => {
        console.log(err);
        this.toastr.error("Eski sifreyi hatali girdiniz. Lütfen tekrar deneyin.");
      }
    });
  }
  passwordValidationMatchValidator(newPasswordControlName: string, passwordVerificationControlName: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        const newPassword = control.get(newPasswordControlName);
        const passwordVerification = control.get(passwordVerificationControlName);

        // return null if controls haven't initialized yet
        if (!newPassword || !passwordVerification) {
            return null;
        }

        // return null if the controls match
        if (newPassword.value === passwordVerification.value) {
            return null;
        }

        // otherwise, return validation error
        return { 'passwordMismatch': true };
    };
}

}
