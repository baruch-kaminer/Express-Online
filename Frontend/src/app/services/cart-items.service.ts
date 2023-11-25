import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { CartItemsModel } from '../models/cartItems-model';
import { AppConfig } from '../utils/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class CartItemsService {

  public constructor(private http: HttpClient, private config: AppConfig){}

  public cartItems = new BehaviorSubject<CartItemsModel[]>(null);

  // public async getCartItemsByCartId(cartId: number): Promise<CartItemsModel[]>{
  //   const observable = this.http.get<CartItemsModel[]>(this.config.cartItemsUrl + cartId);
  //   const cartItems = await firstValueFrom(observable);
  //   return cartItems;
  // }
  public async getCartItemsByCartId(cartId: number): Promise<CartItemsModel[]>{
    
    
    const observable = this.http.get<CartItemsModel[]>(this.config.cartItemsUrl + cartId);
    const cartItems = await firstValueFrom(observable);
    this.cartItems.next(await firstValueFrom(observable));

    return cartItems;
    
  }
  public getCartItems(): Observable<CartItemsModel[]>{
    
    return this.cartItems;
  }

  public async getSumPriceByCartId(cartId: number): Promise<number>{
    
    
    const observable = this.http.get<number>(this.config.cartItemsUrl + 'sum-price/' + cartId);
    const sumPrice = await firstValueFrom(observable);
    return sumPrice;
  }

  public async getCartItemByProductId(productId: number):Promise<any>{
    return await this.cartItems.getValue().find(i => i.productId === productId);
  }

  public async addCartItem(cartItem: CartItemsModel): Promise<CartItemsModel>{
    const observable = this.http.post<CartItemsModel>(this.config.cartItemsUrl, cartItem);
    const newCartItems = await firstValueFrom(observable);
    await this.getCartItemsByCartId(cartItem.cartId);
    return newCartItems;
  }

  public async updateAmountItems(cartItem: CartItemsModel): Promise<CartItemsModel>{
    const observable = this.http.patch<CartItemsModel>(this.config.cartItemsUrl, cartItem);
    const updatedCartItem = await firstValueFrom(observable);
    await this.getCartItemsByCartId(cartItem.cartId);
    return updatedCartItem;
  } 

  public async deleteCartItem(cartItemId:number, cartId: number): Promise<void>{
    const observable = this.http.delete(this.config.cartItemsUrl + cartItemId);
    await firstValueFrom(observable);
    const cartItems = await this.getCartItemsByCartId(cartId);
    await this.cartItems.next(cartItems);
  }

  public async deleteAllCartItems(cartId:number): Promise<void>{
    const observable = this.http.delete(this.config.cartItemsUrl + 'cartId/' + cartId);
    await firstValueFrom(observable);
    await this.getCartItemsByCartId(cartId);
  } 

}
