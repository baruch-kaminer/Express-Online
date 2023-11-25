import { Component, Input, OnInit } from '@angular/core';
import { CartItemsModel } from 'src/app/models/cartItems-model';
import { ProductService } from 'src/app/services/product.service';
import { AppConfig } from 'src/app/utils/app-config.service';

@Component({
  selector: 'app-cart-item-card',
  templateUrl: './cart-item-card.component.html',
  styleUrls: ['./cart-item-card.component.css']
})
export class CartItemCardComponent implements OnInit {

  public constructor( private productService: ProductService,
    private config: AppConfig){}
  
  @Input()
  cartItem: CartItemsModel;
  public imageName: string;
  public imgSrc = this.config.images;
  public isImg = false;
  

  async ngOnInit(): Promise<void>  {
    try {
      
      this.imageName = await this.productService.getImageNameByProductsId(this.cartItem.productId);
      this.isImg = true
    } catch (error) {
      
    }
  }
}
