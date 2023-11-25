import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit{
  public constructor(private orderService: OrderService, private productService: ProductService){}

  public sumOrders: number;
  public sumProducts: number;
  public loader = false

  async ngOnInit(): Promise<void>  {

    try {
      this.sumOrders = await this.orderService.getSumOrders();
      this.sumProducts = await this.productService.getSumProducts();
    } catch (error: any) {
      console.log(error.message);
    }



    setInterval(() => {
      this.loader === true ? this.loader = false : this.loader = true;
    }, 1500)

  }

  

}
