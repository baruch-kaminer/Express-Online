import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CategoryModel } from 'src/app/models/category.model';
import { ProductModel } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class editProductComponent implements OnInit{

  public constructor(private productService: ProductService, private router: Router, 
    private categoryService: CategoryService, private params: ActivatedRoute,
    private _snackBar: MatSnackBar){}
  
  public id: number;

  public product = new ProductModel();

  public categories: CategoryModel[];

  public labelImage:string

  public async ngOnInit(): Promise<void>  {
    this.params.paramMap.subscribe((params: ParamMap): void => {
      this.id = +params.get('id');
    });
    
    try {
      this.product = await this.productService.getProductById(this.id);
    } catch (error: any) {
      console.log(error.message);
    }

    try {
      this.categories = await this.categoryService.getCategories();
    } catch (error:any) {
      console.log(error.message);
    }
    this.labelImage = this.product.imageName?.slice(28);
  }

  @ViewChild('image')
  public image: ElementRef<HTMLInputElement>
  

  public async send(){
    try {
          
      this.product.image = this.image.nativeElement.files[0] ;
      const updateProduct = await this.productService.updateProduct(this.product);
      this._snackBar.open('המוצר עודכן!', 'אישור');
      this.router.navigateByUrl('/products');
    } catch (error:any) {
      console.log(error.message);
    }
  }

  img:any
  
  changeLabelImage(){
    this.labelImage =  this.img;
  }

}
