import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reporter-menu',
  templateUrl: './reporter-menu.component.html',
  styleUrl: './reporter-menu.component.scss'
})
export class ReporterMenuComponent implements OnInit{
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
