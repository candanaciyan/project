import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../shared/service/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private toastr: ToastrService,
    private userService: UserService,
    private loginService: LoginService,
    private fb: FormBuilder,
  ) {}


  passwordForm = this.fb.nonNullable.group({
    name: { value: this.loginService.name, disabled: true },
    surname: { value: this.loginService.surname, disabled: true },
    email: { value: this.loginService.email, disabled: true },
    oldPassword: "",					
    newPassword: ["", [ Validators.required, Validators.minLength(3),Validators.pattern(/^(?=.*[0-9])/)] ],								
    passwordVerification: "",								
    }, {validators: [this.passwordValidationMatchValidator('newPassword', 'passwordVerification')]});	
    
    

    submit() {
      let oldPassword = this.passwordForm.get('oldPassword')!.value;
      let newPassword = this.passwordForm.get('newPassword')!.value;
      this.userService.changePassword({oldPassword, newPassword }).subscribe({
        next: (result) => {
          console.log(result);
          this.toastr.info("Password Changed.");
          this.router.navigate(['/menu']);
        },
        error: (err) => {
          console.log(err);
          this.toastr.error("The old password is incorrect, try again.");
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
