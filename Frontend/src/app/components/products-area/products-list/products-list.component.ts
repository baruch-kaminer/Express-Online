import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { CategoryModel } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartModel } from 'src/app/models/cart.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit{

  public constructor(private productService: ProductService,
    public auth: AuthService, 
     private categoryService: CategoryService, 
     private cartService: CartService,
     private router: Router){}
  
  public products: ProductModel[];
  public categories: CategoryModel[];
  public userId = this.auth.user.userId;
  public cart = new CartModel();
  public isCart = false; 
  public loader = true;
  public hideCart: boolean;
  
  
  public async ngOnInit(): Promise<void>  {
      this.cartService.isHideCart().subscribe( h => {      
      this.hideCart = h
    })

    
    
    try {
      
     await this.productService.getProducts();
     await (await this.productService.getAllProducts()).subscribe(p => this.products = p);
     setTimeout(() => {
      this.loader = false
     }, 1000);
    } catch (error: any) {
      console.log(error.message);
    }
    
    try {
      this.categories = await this.categoryService.getCategories();
    } catch (error:any) {
      console.log(error.message);
    }

   
    
    try {
      const activeCart = (await this.cartService.getCartByUserIsActive(this.userId));

      if(activeCart){
        this.cart = await this.cartService.getCartByUserIsActive(this.userId);
        return;
      } 
      this.cart.userId = this.userId;
      
      let date:any = new Date()
      this.cart.date = date.toISOString().slice(0, 19).replace('T', ' ');
      this.cart = await this.cartService.addCart(this.cart);
      
   
      
    } catch (error:any) {
      console.log(error.message);
    }
    finally{      
      this.isCart = true;
    }

    if(this.auth.user.role === 'Admin') {
      this.isCart = false
    }


   }

public addProduct(){
  this.router.navigateByUrl('products/new');
}

public active = '';
public id :any;

public isBtnActive: number = 0;
toggleBtn(id: number) {
  this.isBtnActive = id
}

public async displaySelectedCategory( categoryId: number): Promise<void>{
  
  await this.productService.getProductsByCategory(categoryId);
}  
   
}
