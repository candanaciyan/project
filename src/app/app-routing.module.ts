import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/component/login/login.component';
import { MenuComponent } from './core/component/menu/menu.component';
import { UserCreateComponent } from './modules/user/user-create/user-create.component';
import { AccountComponent } from './core/component/account/account.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path:'menu', component: MenuComponent, /*canActivate: [loginGuard],*/
  children: [
    { path: 'product', loadChildren: 
        () => import('./modules/product/product.module')
        .then(m => m.ProductModule) },
    { path: 'shelf', loadChildren: 
        () => import('./modules/shelf/shelf.module')
        .then(m => m.ShelfModule) },
    { path: 'user', loadChildren: 
        () => import('./modules/user/user.module')
        .then(m => m.UserModule) },

    { path: 'account', component: AccountComponent }
  ]
},
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
