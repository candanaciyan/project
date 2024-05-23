import { Component } from '@angular/core';
import { LoginService } from '../../../core/service/login.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ShelfService } from '../../../shared/service/shelf.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-shelf-create',
  templateUrl: './shelf-create.component.html',
  styleUrl: './shelf-create.component.scss'
})
export class ShelfCreateComponent {

  shelfCreateForm = this.fb.nonNullable.group({
    count: [1, [Validators.required, Validators.min(1)]],
    capacity: 5,     
    });
    


  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private toastr: ToastrService,
    private shelfService: ShelfService,
    private fb: FormBuilder,
    
  ) {}
  
     
  createShelf() {
    if (this.shelfCreateForm.valid) {
      const count = this.shelfCreateForm.get('count')!.value;
      const capacity = this.shelfCreateForm.get('capacity')!.value;

      this.shelfService.createShelf(capacity, count).subscribe({
        next: (res) => {
          this.toastr.info(res.message + ' shelves created');
        },
        error: (err) => {
          this.toastr.error(err.error.message);
        }
      });
    } else {
      this.toastr.error("Please enter a number greater than 0");
    }
  }

  close() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

}
