import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../../core/service/login.service';
import { UserService } from '../../../shared/service/user.service';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { User } from '../../../shared/model/user';
import { AdminChangePasswordRequest } from '../../../shared/dto/adminChangePasswordRequest';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-password-change',
  templateUrl: './user-password-change.component.html',
  styleUrls: ['./user-password-change.component.scss']
})
export class UserPasswordChangeComponent {

  users: User[] = [];
  selectedUser: User | null = null; 

  passwordForm = this.fb.nonNullable.group({
    email: { value: this.selectedUser?.email, disabled: true },  
    newPassword: ["", [ Validators.required, Validators.minLength(3),Validators.pattern(/^(?=.*[0-9])/)] ],
    passwordVerification: ["", Validators.required]
  }, { validators: this.passwordValidationMatchValidator('newPassword', 'passwordVerification') });

  constructor(
    public route: ActivatedRoute,
    private toastr: ToastrService,
    private userService: UserService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserPasswordChangeComponent>,
  ) {

  }

  close() {
    this.dialogRef.close();
  }
  submit() {
    const newPassword = this.passwordForm.get('newPassword')!.value;
    this.dialogRef.close({newPassword});
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

