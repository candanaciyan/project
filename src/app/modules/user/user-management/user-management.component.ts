import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../shared/model/user';
import { LoginService } from '../../../core/service/login.service';
import { UserPasswordChangeComponent } from '../user-password-change/user-password-change.component';
import { MatDialog } from '@angular/material/dialog';
import { MainDialogueComponent } from '../../../shared/components/main-dialogue/main-dialogue.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private toastr: ToastrService,
    private userService: UserService,
    private loginService: LoginService,
    private dialog: MatDialog,
  ) { }
  ngOnInit(): void {
    this.refreshUsers();
  }


  refreshUsers() {
    this.userService.getAllUsers().subscribe({
      next: (result) => {
        this.users = result;
      }
    });
  }

  userHasRole(roleName: string): boolean {
    return this.loginService.userHasRole(roleName);
  }

  createUser() {
    this.router.navigate(['create'], { relativeTo: this.route });
    //router ile o sayfaya yonlendirdi 

      }

      selectUser(user: User) {
  
    
          this.selectedUser = user;
              }

  editUser() {
    
    let dialog =  this.dialog.open(UserPasswordChangeComponent, {
      width: '400px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
    });
    dialog.afterClosed().subscribe({
      next: (data) => {
        if (data) {
          this.userService.changePasswordAdmin(this.selectedUser!.email,data.newPassword).subscribe({
            next: (result) => {
              console.log(result);
              this.toastr.success("Password changed successfully.");
              this.refreshUsers();
            },
            error: (err) => {
              console.log(err);
              this.toastr.error("Password change failed.");
            }
          });
        }}})
      }
deleteUser() {
  let dialog =  this.dialog.open(MainDialogueComponent, {
    width: '300px',
    enterAnimationDuration: '250ms',
    exitAnimationDuration: '250ms',
  });
  dialog.afterClosed().subscribe({
    next: (data) => {
      if (data?.result === 'yes') {
        this.mainDeleteUser();
      }
    }
  });
  dialog.componentInstance.called = 'Are you sure for delete this shelf?';

}
mainDeleteUser() {
  
    this.userService.deleteUser(this.selectedUser!.email).subscribe({
      next: () => {
        this.toastr.info('User deleted');
        this.refreshUsers();
      },
      error: (err) => {
        this.toastr.error(err.error.mesaj);
      }
    });
  
}


}
