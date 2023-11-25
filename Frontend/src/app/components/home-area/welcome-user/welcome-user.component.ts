import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartModel } from 'src/app/models/cart.model';
import { CartItemsModel } from 'src/app/models/cartItems-model';
import { OrderModel } from 'src/app/models/order.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-welcome-user',
  templateUrl: './welcome-user.component.html',
  styleUrls: ['./welcome-user.component.css']
})
export class WelcomeUserComponent implements OnInit{

  public constructor(private auth: AuthService, private cartService: CartService,
     private orderService: OrderService, private cartItemsService: CartItemsService,
     private router: Router){}

  public user = this.auth.user;
  public cartByUser: CartModel;
  public orderByUser: OrderModel;
  public cartItems: CartItemsModel[];
  public sumPriceCart: number;
  public textBtn = 'התחלת קניה';
  public timeNow = 'בוקר טוב';

  async ngOnInit(): Promise<void>  {
    try {
      if(this.auth.user.role === 'Admin'){
        this.router.navigateByUrl('/products')
        return;
      }

      const date = new Date().getHours()
      if(date >= 12 &&  date < 17){
        this.timeNow = 'צהריים טובים'
      }
      if(date >= 17 && date < 21){
        this.timeNow = 'ערב טוב'
      }
      if(date >= 21 || date < 6){
        this.timeNow = 'לילה טוב'
      }

      this.cartByUser =  await this.cartService.getCartByUserIsActive(this.auth.user.userId);
    
      if(this.cartByUser){
        this.cartItems = await this.cartItemsService.getCartItemsByCartId(this.cartByUser.cartId);
        this.sumPriceCart = await this.cartItemsService.getSumPriceByCartId(this.cartByUser.cartId);
        this.textBtn = ' להמשך קניה ולמעבר לחנות';
        return;
      } 
      
      this.orderByUser = await this.orderService.getLastOrderByUserId(this.auth.user.userId);
      
    } catch (error:any) {
      
      console.log(error.message);
    }
  }


}
