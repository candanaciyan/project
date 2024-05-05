import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductManagementComponent } from './product-management/product-management.component';
import { ProductAcceptComponent } from './product-accept/product-accept.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductSaleComponent } from './product-sale/product-sale.component';
import { ROL_ADMIN } from '../../shared/model/constants';
import { roleControlGuard } from '../../shared/guard/role-control.guard';

const routes: Routes = [
  { path: '', component: ProductManagementComponent, pathMatch: 'full'},
  { path: 'accept', component: ProductAcceptComponent},
  { path: 'create', component: ProductCreateComponent, canActivate: [roleControlGuard(ROL_ADMIN)]},
  { path: 'sale', component: ProductSaleComponent, pathMatch: 'full'},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
