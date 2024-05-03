import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductSaleComponent } from './product-sale/product-sale.component';
import { ProductAcceptComponent } from './product-accept/product-accept.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ProductSaleComponent,
    ProductAcceptComponent,
    ProductManagementComponent,
    ProductCreateComponent,
       
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
  
    ReactiveFormsModule,
    ToastrModule.forRoot(),
   
    SharedModule,
  ]
})
export class ProductModule { }
