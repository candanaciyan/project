import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserPasswordChangeComponent } from './user-password-change/user-password-change.component';
import { UserManagementComponent } from './user-management/user-management.component';

const routes: Routes = [
   { path: '', component: UserManagementComponent, pathMatch: 'full' },
    { path: 'create', component: UserCreateComponent },
   { path: 'changepassword', component: UserPasswordChangeComponent },
   
  ];
  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
