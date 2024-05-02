import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShelfRoutingModule } from './shelf-routing.module';
import { ShelfEditComponent } from './shelf-edit/shelf-edit.component';
import { ShelfManagementComponent } from './shelf-management/shelf-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ShelfEditComponent,
    ShelfManagementComponent,
  ],
  imports: [
    CommonModule,
    ShelfRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    SharedModule,
  ]
})
export class ShelfModule { }
