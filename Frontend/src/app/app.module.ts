import { NgModule } from '@angular/core';
// import { NoopAnimationsModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { HeaderComponent } from './components/layout-area/header/header.component';
import { FooterComponent } from './components/layout-area/footer/footer.component';
import { MenuComponent } from './components/layout-area/menu/menu.component';
import { HomeComponent } from './components/home-area/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './components/home-area/page-not-found/page-not-found.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddProductComponent } from './components/products-area/add-product/add-product.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { JwtInterceptor } from './utils/jwt.interceptor';
import { ProductsListComponent } from './components/products-area/products-list/products-list.component';
import { ProductCardComponent } from './components/products-area/product-card/product-card.component';
import { editProductComponent } from './components/products-area/edit-product/edit-product.component';
import { SearchProductComponent } from './components/products-area/search-product/search-product.component';
import { CartComponent } from './components/cart-area/cart/cart.component';
import { AuthMenuComponent } from './components/auth-area/auth-menu/auth-menu.component';
import { WelcomeComponent } from './components/home-area/welcome/welcome.component';
import { WelcomeUserComponent } from './components/home-area/welcome-user/welcome-user.component';
import { OrderComponent } from './components/home-area/order/order.component';
import { HighlighterPipe } from './pipes/highlighter.pipe';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import { CartItemCardComponent } from './components/cart-area/cart-item-card/cart-item-card.component';
import {MatStepperModule} from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CityListComponent } from './components/auth-area/city-list/city-list.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';





@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    HomeComponent,
    PageNotFoundComponent,
    AddProductComponent,
    RegisterComponent,
    LoginComponent,
    ProductsListComponent,
    ProductCardComponent,
    editProductComponent,
    SearchProductComponent,
    CartComponent,
    AuthMenuComponent,
    WelcomeComponent,
    WelcomeUserComponent,
    OrderComponent,
    HighlighterPipe,
    CartItemCardComponent,
    CityListComponent
  ],
  imports: [
    BrowserAnimationsModule,
    NoopAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})  
  ],
  providers: [
    {useClass: JwtInterceptor, provide: HTTP_INTERCEPTORS, multi: true},
    
  ],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
