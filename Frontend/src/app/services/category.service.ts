import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { CategoryModel } from "../models/category.model";
import { AppConfig } from "../utils/app-config.service";

@Injectable({
    providedIn: 'root'
})
export class CategoryService{

    public constructor(private http: HttpClient, private config: AppConfig){}

    async getCategories(): Promise<CategoryModel[]> {
        const observable = this.http.get<CategoryModel[]>(this.config.categoriesUrl);
        const categories = await firstValueFrom(observable);
        return categories;
    }
}