import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserPasswordChangeComponent } from './user-password-change/user-password-change.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';

import { SharedModule } from '../../shared/shared.module';
import { UserManagementComponent } from './user-management/user-management.component';





@NgModule({
  declarations: [
    UserCreateComponent,
    UserPasswordChangeComponent,
    UserManagementComponent,
    
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    
    SharedModule,

   
  ]
})
export class UserModule { }
