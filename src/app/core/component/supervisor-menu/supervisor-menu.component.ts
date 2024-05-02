import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-supervisor-menu',
  templateUrl: './supervisor-menu.component.html',
  styleUrl: './supervisor-menu.component.scss'
})
export class SupervisorMenuComponent implements OnInit{
  constructor(
    private loginService: LoginService,
    private router: Router,
    public route: ActivatedRoute,
    private toastr: ToastrService,
  ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/']);
  }
}
