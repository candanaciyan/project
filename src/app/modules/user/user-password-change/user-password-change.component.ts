import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../../core/service/login.service';
import { UserService } from '../../../shared/service/user.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-password-change',
  templateUrl: './user-password-change.component.html',
  styleUrl: './user-password-change.component.scss'
})
export class UserPasswordChangeComponent {

  passwordForm = this.fb.nonNullable.group({
    //buraya.nonNullable sonra group dersek o zaman burdaki
    // degiskenlerin null gelme ihtimali kalmiyor.garanti etmis oluyoruz string donuyor		
    email: { value: this.loginService.email, disabled: true },
    //emailin readonly olmasini saglayacagim degistirilemesin diye
    //value sunu obje haline getiriyoruz blok isaretleri koyupvalue ya degeri verip virgul sonrasina ise baska ozellikler verebiliyoruz
    //biz disabled true diyip form uzerinde bu alani otomatik disabled ettik
       
    //burayi loginservice degerinden aldigim email degiskenini aliyorum
    oldPassword: "",					
    newPassword: ["", [ Validators.required, Validators.minLength(3), Validators.pattern(/admin/)] ],								
    passwordVerification: "",								
    }, {validators: [/*sifreTekrariKontrolu*/]});								
    

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
      }
    });
  }




}
