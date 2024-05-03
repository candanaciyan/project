import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShelfManagementComponent } from './shelf-management/shelf-management.component';
import { ShelfEditComponent } from './shelf-edit/shelf-edit.component';
import { ShelfCreateComponent } from './shelf-create/shelf-create.component';

const routes: Routes = [
  { path: '', component: ShelfManagementComponent, pathMatch: 'full' },
  { path: 'edit', component: ShelfEditComponent },  
  { path: 'create', component: ShelfCreateComponent },  
   ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShelfRoutingModule { }
