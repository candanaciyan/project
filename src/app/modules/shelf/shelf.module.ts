import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShelfRoutingModule } from './shelf-routing.module';
import { ShelfEditComponent } from './shelf-edit/shelf-edit.component';
import { ShelfManagementComponent } from './shelf-management/shelf-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';

import { SharedModule } from '../../shared/shared.module';
import { ShelfCreateComponent } from './shelf-create/shelf-create.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    ShelfEditComponent,
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
