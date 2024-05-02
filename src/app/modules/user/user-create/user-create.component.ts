import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../shared/service/user.service';
import { LoginService } from '../../../core/service/login.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss'
})
export class UserCreateComponent {
  createForm = this.fb.nonNullable.group({
    name: '',
    surname: '',
    email: '',
    password: '',
    roleId: 0,
    createdate: '',
  });



  constructor(
    private router: Router,
    private fb: FormBuilder,
    public route: ActivatedRoute,
    private toastr: ToastrService,
    private userService: UserService,
    private loginService: LoginService,
  ) { }


  submit() {
   let userId = this.loginService.userId;
   this.userService.createUser({ ...this.createForm.value, userId }).subscribe({
     next: (resp) => {
       this.toastr.success('User Created');
       this.router.navigate(['..'], { relativeTo: this.route });
     },
     error: (err) => {
       console.log(err);
       this.toastr.error("Error occured");
     }
   });
  }

}
