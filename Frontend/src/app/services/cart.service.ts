import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { CartModel } from '../models/cart.model';
import { AppConfig } from '../utils/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public constructor(private http: HttpClient, private config: AppConfig){}

  public stateCart = new BehaviorSubject<boolean>(false);
  public isHideCart(): Observable<boolean>{
    return this.stateCart;
  }
  public hideCart(){
    this.stateCart.next(false)
  }
  public showCart(){
    this.stateCart.next(true)
  }


  public async getCartByUser(userId: number):Promise<CartModel>{
    const observable = this.http.get<CartModel[]>(this.config.cartsUrl + userId)
    const cart = await firstValueFrom(observable);  
          
    return cart[0];
  }

  public async getCartByUserIsActive(userId: number):Promise<CartModel>{
    const observable = this.http.get<CartModel[]>(this.config.cartsUrl + 'is-active/' + userId)
    const cart = await firstValueFrom(observable);        
    return cart[0];
  }

  public async activeCart(userId: number): Promise<number>{    
    const cartByUser = await this.getCartByUserIsActive(userId);
    return cartByUser?.state;
  }

  public async addCart(cart: CartModel): Promise<CartModel>{
    const observable = this.http.post<CartModel>(this.config.cartsUrl, cart);
    const newCart = await firstValueFrom(observable);
    
    
    return newCart;
  }
}
