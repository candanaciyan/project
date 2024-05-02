import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserPasswordChangeComponent } from './user-password-change/user-password-change.component';

const routes: Routes = [
  { path: 'user-create', component: UserCreateComponent, pathMatch: 'full'},
  { path: 'user-password-change', component: UserPasswordChangeComponent, pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
