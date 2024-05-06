import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserPasswordChangeComponent } from './user-password-change/user-password-change.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ROL_ADMIN } from '../../shared/model/constants';
import { roleControlGuard } from '../../shared/guard/role-control.guard';

const routes: Routes = [
   { path: '', component: UserManagementComponent, pathMatch: 'full' },
    { path: 'create', component: UserCreateComponent ,canActivate: [roleControlGuard(ROL_ADMIN)] },
   { path: 'changepassword', component: UserPasswordChangeComponent },   
  ];
  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
