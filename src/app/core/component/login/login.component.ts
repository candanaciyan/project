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

    this.loginService.login(email,password).subscribe({

//loginserviceten login cagirip buna email ve passwordu veriyorum bunlar 
//geriye obs dondu onun icin sub cagirmak gerekiyor
// istekte bulunmus oldum cevap geldiginde okumak icin sub icine bir obje tanimlamam gerekiyor
// bu objenin 3 ozelligi var next errror complete
// normalde obs birden fazla deger donuyor ama request yapildiginda geriye birden fazla deger donmuyor 
// her dondurulen degeri okumak icin next fonk kullaniyoruz son deger okunduktan sonra artik
// bitti bilgisini almak icin complete ozelligini kullaniyoruz bunu cagirdiysak sonra next cagiramiyoruz
// ben bursa servera req bulundugum icin onun cevabini okudugum icin geriye tek cevabin dondugunu biliyorum
// next donen degeri parametre olarak alabiliyor

next: () => {
        this.toastr.success('Logged in');
        this.router.navigate(['/menu']);
        //
      },
      error: (err) => {
        this.toastr.error('Error occured');
        this.loginForm.patchValue({ password: '' });
        console.log(err);
      }
    });
  }
}



