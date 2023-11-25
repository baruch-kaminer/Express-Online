import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { OrderModel } from '../models/order.model';
import { AppConfig } from '../utils/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public constructor(private http: HttpClient, private config: AppConfig){}

  public async getSumOrders(): Promise<number>{
    const observable = this.http.get<number>(this.config.ordersUrl + 'sun-orders');
    const sunOrders = await firstValueFrom(observable);
    return sunOrders;
  }

  public async getLastOrderByUserId(userId: number): Promise<OrderModel>{
    const observable = this.http.get<OrderModel[]>(this.config.ordersUrl + userId);
    const order = await firstValueFrom(observable);
    return order[0];
  }

  public async addOrder(order: OrderModel): Promise<OrderModel>{
    const observable = this.http.post<OrderModel>(this.config.ordersUrl, order);
    const newOrder = firstValueFrom(observable);
    return newOrder;
  }
}
