import { Component } from '@angular/core';
import { LoginService } from '../../../core/service/login.service';
import { FormBuilder } from '@angular/forms';
import { ShelfService } from '../../../shared/service/shelf.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-shelf-create',
  templateUrl: './shelf-create.component.html',
  styleUrl: './shelf-create.component.scss'
})
export class ShelfCreateComponent {
  shelfCreateForm = this.fb.nonNullable.group({
    count: 1,
    capacity: 5,     
    });
    


  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private toastr: ToastrService,
    private shelfService: ShelfService,
    private loginService: LoginService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ShelfCreateComponent>,
    
  ) {}

  close() {
     this.dialogRef.close();
  }
    
  submit() {
    const count = this.shelfCreateForm.get('count')!.value;
    const capacity = this.shelfCreateForm.get('capacity')!.value;  
    this.dialogRef.close({count, capacity});
     }
    //  burda artik yaratma islemini yapiyoruz ne gonderiyoruz  adet  ve kapasiteyi gonderiyoruz sunucuya
    //  degiskenin degerini degistiremeyecegimiz icin const verdik
    //  kapasite ve adetin degerini aliyorum 
    //  bu obje ile close ediyorum
    //  simdi bunu cagirdigim yere gidecegim bunu alacagim ve cap ve countu okuyup 
     



}
