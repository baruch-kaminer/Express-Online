import { UploadedFile } from "express-fileupload";

class ProductModel{

    public productId: number;
    public productName: string;
    public categoryId: number;
    public image: UploadedFile;
    public imageName: string;
    public price: number;
    
    public constructor(product: ProductModel){
        this.productId =  product.productId;
        this.productName =  product.productName;
        this.categoryId =  product.categoryId;
        this.image =  product.image;
        this.imageName =  product.imageName;
        this.price = product.price;
    }
}

export default ProductModel;