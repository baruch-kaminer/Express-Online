import { Component } from '@angular/core';
import { filter, map, Observable, Subscription } from 'rxjs';
import { ProductModel } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent {

  public constructor(private productService: ProductService){}

  public products: ProductModel[];
  public name: string;
  public loader = false
  // private sub: Subscription;

  public async search():Promise<void>{
    try {
      this.loader = true
      this.products = await this.productService.getProductsByName(this.name);
       await (await this.productService.getAllProducts()).subscribe(p => p =  this.products )
        setTimeout(() => {
          this.loader = false
        }, 500);    
    } catch (error:any) {
      console.log(error.message);
    }
  }
}
