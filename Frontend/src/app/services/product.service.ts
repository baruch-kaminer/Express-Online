import { HttpClient } from '@angular/common/http';
import {Injectable, OnInit} from '@angular/core';
import { AppConfig } from '../utils/app-config.service';
import {BehaviorSubject, firstValueFrom, Observable} from "rxjs";
import { ProductModel } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    public constructor(private http: HttpClient, private config: AppConfig){}

    public products = new BehaviorSubject<ProductModel[]>(null);
    
    
    
    // public async getAllProducts(): Promise<ProductModel[]>{
    //     const observable = this.http.get<ProductModel[]>(this.config.productsUrl);
    //     const products = await firstValueFrom(observable);
    //     return products;
    // }

    

    public async getProducts(): Promise<void>{
        const observable = this.http.get<ProductModel[]>(this.config.productsUrl);
        this.products.next(await firstValueFrom(observable));
    }

    public async getAllProducts(): Promise<Observable<ProductModel[]>>{        
        return this.products;
    }

    public async getProductById(id: number): Promise<ProductModel>{
        const observable = this.http.get<ProductModel[]>(this.config.productsUrl + id);
        const product = await firstValueFrom(observable);
        return product[0];
    }

    public async getProductsByCategory(categoryId: number): Promise<ProductModel[]>{
        const observable = this.http.get<ProductModel[]>(this.config.productsUrl + 'category/' + categoryId);
        const products = await firstValueFrom(observable);
        this.products.next(await firstValueFrom(observable));
        return products;
    }

    public async getProductsByName(name: string): Promise<ProductModel[]>{
        const observable = this.http.get<ProductModel[]>(this.config.productsUrl + 'name/' + name);
        const products = await firstValueFrom(observable);
        products.length > 0 ? this.products.next(await firstValueFrom(observable)) : await this.getProducts();  
        return products;
    }

    public async getSumProducts(): Promise<number>{
        const observable = this.http.get<number>(this.config.productsUrl + 'sum-products' );
        const sumProducts = await firstValueFrom(observable);
        return sumProducts;
    }

    public async getImageNameByProductsId(id: number): Promise<string>{
        const observable = this.http.get<string>(this.config.productsUrl + 'image-name/' + id );
        const imageName = await firstValueFrom(observable);
        return imageName;
    }

    public async addProduct(product: ProductModel): Promise<ProductModel>{
        const formData = this.formData(product);
        const observable = this.http.post<ProductModel>(this.config.productsUrl, formData);
        const addProduct = await firstValueFrom(observable);
        return addProduct;
    }

    public async updateProduct(product: ProductModel): Promise<ProductModel>{
        const formData = this.formData(product);
        const observable = this.http.patch<ProductModel>(this.config.productsUrl + product.productId, formData);
        const updateProduct = await firstValueFrom(observable);
        return updateProduct;
    }

    public async deleteProduct(id: number):Promise<void>{
        const observable = this.http.delete(this.config.productsUrl + id);
        await firstValueFrom(observable);
    }

    public formData(product: ProductModel): any{
        const formData = new FormData();
        formData.append('productName', product.productName);
        formData.append('categoryId', product.categoryId.toString());
        formData.append('image', product.image);
        formData.append('imageName', product.imageName);
        formData.append('price', product.price.toString());
        return formData;
    }

}