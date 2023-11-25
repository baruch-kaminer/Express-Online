import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartModel } from 'src/app/models/cart.model';
import { OrderModel } from 'src/app/models/order.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import {ErrorStateMatcher} from '@angular/material/core';




@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit{

  public constructor(private cartService: CartService, private auth: AuthService,
   private orderService: OrderService, 
   private cartItemService: CartItemsService,
  private router: Router){}

  public cart: CartModel;
  public father = 'order';
  public order = new OrderModel();
  public user = this.auth.user;
  public success = false;  
  public orderUser = false;
  public loader = false;
  public currentDate: any;



  
  
  public city = new FormControl('', [Validators.required, Validators.minLength(2)]);
  public street = new FormControl('', [Validators.required, Validators.minLength(2)]);
  public date = new FormControl('', [Validators.required, Validators.min(2023-7-15)]);
  public creditCard = new FormControl('', [Validators.required, Validators.min(1000000), Validators.max(9999999999999999)]);
  
  matcher = new ErrorStateMatcher();
  async ngOnInit(): Promise<void>  {

    this.cart = await this.cartService.getCartByUserIsActive(this.auth.user.userId);
    // this.currentDate = new Date().toLocaleDateString().replaceAll('.', '-');
    this.currentDate = new Date().toLocaleDateString().split('.').reverse().join('-');
    console.log(this.currentDate );
    
  }

  public valDate(){
    // const date = new Date(this.order.date)
    // console.log(123);
    // if(date < new Date()){
    //   alert('!!!!')
    // }
    
  }

  public async sendOrder(): Promise<void>{
   
    try {
      this.loader = true;
      this.order.cartId = this.cart.cartId;
      this.order.userId = this.user.userId;
      this.order.price = await this.cartItemService.getSumPriceByCartId(this.cart.cartId);
      const newOrder =  await this.orderService.addOrder(this.order);
      setTimeout(() => {
        this.loader = false;
      }, 1500);
      if(newOrder) this.success = true; 
    } catch (error: any) {
      this.loader = false;
      console.log(error.message);
    }
  }

  public orderMe(){    
    if(this.order.city){
      this.order.city = '';
      this.order.street = '';
    }else{
      this.order.city = this.user.city;
      this.order.street = this.user.street;
    }
    
  }





}
