import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  url = "";
  role = '';
  constructor(
    private loginService: LoginService,
    private router: Router,
    public route: ActivatedRoute,
    private toastr: ToastrService,
  ) {}

 
   ngOnInit(): void {
    this.role = this.loginService.getRole();
    }    


  logout() {
    this.loginService.logout();
    this.router.navigate(['/']);
  }

}
