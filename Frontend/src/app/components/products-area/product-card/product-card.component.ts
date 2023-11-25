import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartModel } from 'src/app/models/cart.model';
import { CartItemsModel } from 'src/app/models/cartItems-model';
import { ProductModel } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { CartService } from 'src/app/services/cart.service';
import { AppConfig } from 'src/app/utils/app-config.service';



@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit{

  public constructor(private config: AppConfig, private router: Router, 
  private  cartItemsService: CartItemsService, 
  private cartService: CartService,
  private auth: AuthService){}
  

  @Input()
  public product: ProductModel;
  public changeAmount = false;
  public cartItem = new CartItemsModel();
  public imgSrc = this.config.images;
  public amount = 1;
  public user = this.auth.user;
  public cartItems: CartItemsModel[];
  @Input()
  public cartId: number;
  public btnAddCart = 'הוספה לסל';
  
   async ngOnInit(): Promise<void>{
    
    await this.cartItemsService.getCartItemsByCartId(this.cartId);

    await this.cartItemsService.getCartItems().subscribe( i =>{
      
      this.cartItems = i;
      this.isItem();
    } );
    if(this.user.role === 'Admin'){
      this.btnAddCart = 'עריכת מוצר';
    }
  }

  public async isItem(){
    const item = this.cartItems.find(i => i.productId === this.product.productId)
    const cartItem = await this.cartItemsService.getCartItemByProductId(this.product.productId);
    if(item){      
      this.cartItem = cartItem;
      this.amount = this.cartItem.amount;
      this.changeAmount = true; 
      return     
    }
    this.changeAmount = false;
  }


  public async addProductForCart(): Promise<void>{
    try {
      
    if(this.cartItems.length === 0){
            this.cartService.showCart()
    }
      this.cartItem.amount = 1;
      this.cartItem.productId = this.product.productId; 
      this.cartItem.productName = this.product.productName; 
      this.cartItem.price = this.product.price;
      this.cartItem.cartId = this.cartId;
      this.cartItem = await this.cartItemsService.addCartItem(this.cartItem);
      this.changeAmount = true;
      
    } catch (error:any) {
      console.log(error.message);
    }
  }

  public async updateAmountItems(): Promise<void>{
    this.cartItem.price = this.product.price * this.amount;
    this.cartItem.amount = this.amount;
    await this.cartItemsService.updateAmountItems(this.cartItem);    
  }

  public editProduct(): void{
    this.router.navigateByUrl(`product/edit/${this.product.productId}`)
  }

  public async deleteItem(){
    this.amount = 0;
   await this.updateAmountItems()

  }

}
