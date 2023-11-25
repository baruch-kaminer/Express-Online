import {Injectable} from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class AppConfig{
    private baseUrl = 'http://localhost:3001/api/';
    public registerUrl = this.baseUrl + 'auth/register';
    public loginUrl = this.baseUrl + 'auth/login';
    public isIdTakenUrl = this.baseUrl + 'userId/';
    public cartsUrl = this.baseUrl + 'carts/';
    public cartItemsUrl = this.baseUrl + 'cart-items/';
    public categoriesUrl = this.baseUrl + 'categories';
    public productsUrl = this.baseUrl + 'products/';
    public ordersUrl = this.baseUrl + 'orders/';
    public images = this.baseUrl + 'products/images/';
}
