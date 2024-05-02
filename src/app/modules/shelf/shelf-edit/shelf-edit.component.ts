import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../../core/service/login.service';
import { ShelfService } from '../../../shared/service/shelf.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-shelf-edit',
  templateUrl: './shelf-edit.component.html',
  styleUrl: './shelf-edit.component.scss'
})
export class ShelfEditComponent {
  shelfForm = this.fb.nonNullable.group({
    count: 1,
    capacity: 0,
  });

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private toastr: ToastrService,
    private shelfService: ShelfService,
    private loginService: LoginService,
    private fb: FormBuilder,
    
  ) {}

  close() {
    this.dialogRef.close();
  }
  submit() {
    const capacity = this.shelfForm.get('capacity')!.value;
    const count = this.shelfForm.get('count')!.value;
    this.dialogRef.close({capacity, count});
  }

}
