import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShelfManagementComponent } from './shelf-management/shelf-management.component';

import { ShelfCreateComponent } from './shelf-create/shelf-create.component';
import { roleControlGuard } from '../../shared/guard/role-control.guard';
import { ROL_ADMIN } from '../../shared/model/constants';

const routes: Routes = [
  { path: '', component: ShelfManagementComponent, pathMatch: 'full' },
  { path: 'create', component: ShelfCreateComponent, canActivate: [roleControlGuard(ROL_ADMIN)] },  
   ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShelfRoutingModule { }
