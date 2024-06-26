import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShelfRoutingModule } from './shelf-routing.module';

import { ShelfManagementComponent } from './shelf-management/shelf-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';

import { SharedModule } from '../../shared/shared.module';
import { ShelfCreateComponent } from './shelf-create/shelf-create.component';


@NgModule({
  declarations: [

    ShelfManagementComponent,
    ShelfCreateComponent,
  ],
  imports: [
    CommonModule,
    ShelfRoutingModule,
    FormsModule,  
    ReactiveFormsModule,
    ToastrModule.forRoot(),    
    SharedModule,
  ]
})
export class ShelfModule { }
