import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryModel } from 'src/app/models/category.model';
import { ProductModel } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{

  public constructor(private productService: ProductService, private router: Router, 
    private categoryService: CategoryService,
    private _snackBar: MatSnackBar){}
  
  public product = new ProductModel();
  public categories: CategoryModel[];
  public labelImage = 'תמונה';

  public async ngOnInit(): Promise<void>  {
    try {
      this.categories = await this.categoryService.getCategories();
    } catch (error:any) {
      console.log(error.message);
    }
  }

  @ViewChild('image')
  public image: ElementRef<HTMLInputElement>
  

  public async send(){
    
    try {
      this.product.image = this.image.nativeElement.files[0];
      const newProduct = await this.productService.addProduct(this.product);
      this._snackBar.open('המוצר נשמר!', 'אישור')
      this.product = new ProductModel();
    } catch (error:any) {
      console.log(error.message);
    }
  }

  public img:string;
  changeLabelImage(){
    this.labelImage =  this.img;
  }
}
