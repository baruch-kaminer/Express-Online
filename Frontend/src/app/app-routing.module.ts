import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth-area/login/login.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { HomeComponent } from './components/home-area/home/home.component';
import { PageNotFoundComponent } from './components/home-area/page-not-found/page-not-found.component';
import { AddProductComponent } from './components/products-area/add-product/add-product.component';
import { editProductComponent } from './components/products-area/edit-product/edit-product.component';
import { ProductsListComponent } from './components/products-area/products-list/products-list.component';
import { OrderComponent } from './components/home-area/order/order.component';
import { AuthGuard } from './utils/auth.guard';

const routes: Routes = [
  {path: 'home', component:HomeComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'login', component:LoginComponent},
  {path: 'products/new', component: AddProductComponent, canActivate: [AuthGuard] },
  {path: 'products', component: ProductsListComponent, canActivate: [AuthGuard]},
  {path: 'order', component: OrderComponent, canActivate: [AuthGuard]},
  // {path: 'products/new', component: AddProductComponent, canActivate: [AuthGuard]},
  {path: 'product/edit/:id', component: editProductComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo:'/home', pathMatch:'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
