import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../shared/service/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent {
  createForm = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    roleId: [null, Validators.required], // null değeri seçilmemiş bir değer olarak başlangıçta atanıyor
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public route: ActivatedRoute,
    private toastr: ToastrService,
    private userService: UserService,
  ) {}

  submit() {
    if (this.createForm.valid) {
      this.userService.createUser({ ...this.createForm.value }).subscribe({
        next: (resp) => {
          console.log(resp);
          this.toastr.success('User Created');
          this.router.navigate(['..'], { relativeTo: this.route });
        },
        error: (err) => {
          console.log(err);
          this.toastr.error("Please try again.");
        }
      });
    } else {
      this.toastr.error("Please fill out all required fields.");
    }
  }
}
