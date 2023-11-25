import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import fileHandler from "../2-utils/fileHandler";
import { ResourceNotFoundErrorModel } from "../4-models/error-models";
import ProductModel from "../4-models/product-model";


async function getAllProducts(): Promise<ProductModel[]> {
    const sql = `SELECT * FROM products`;
    const products = await dal.execute( sql, [] );
    return products;
}

async function getProductById(id:number): Promise<ProductModel[]> {
    const sql = `SELECT * FROM products WHERE productId  = ?`;
    const product = await dal.execute( sql, [id] );
    return product;
}

async function getProductsByCategory(categoryId:number): Promise<ProductModel[]> {
    const sql = `SELECT * FROM products WHERE categoryId  = ?`;
    const products = await dal.execute( sql, [categoryId] );
    return products;
}

async function getProductsByName(name:string): Promise<ProductModel[]> { 
    const sql = `SELECT * FROM products WHERE productName LIKE ?`;
    const products = await dal.execute( sql, [name + '%'] );
    return products;
}

async function getSumProducts(): Promise<number> {
    const sql = `SELECT COUNT(*) FROM products`;
    const products = await dal.execute( sql, [] );
    return products;
}

async function getImageNameByProductsId(id: number): Promise<string> {
    const sql = `SELECT imageName FROM products WHERE productId = ?`;
    const imageName = await dal.execute( sql, [id] );
    return imageName[0]['imageName'];
}

async function addProduct(product:ProductModel): Promise<ProductModel> {
    product.price = +product.price;
    if(product.image){
        product.imageName = await fileHandler.saveFile(product.image);
        delete product.image;
    }    
    const sql = `INSERT INTO products VALUES( DEFAULT, ?, ?, ?, ? ) `;
    const info:OkPacket = await dal.execute( sql, [
        product.productName, product.categoryId, product.imageName, product.price
    ] );
    product.productId = info.insertId;
    return product;
}

async function updateProduct(product:ProductModel): Promise<ProductModel> {
        console.log(product);
        
    if (product.image) {
        product.imageName && await fileHandler.deleteFile(product.imageName);
        product.imageName = await fileHandler.saveFile(product.image)
        delete product.image;
    }

    const sql = `
    UPDATE products SET
    productName = ?,
    categoryId = ?,
    imageName = ?,
    price = ? 
    WHERE productId = ?
    `;
    const info:OkPacket = await dal.execute( sql, [
        product.productName, product.categoryId, product.imageName, product.price, product.productId
    ] );

    if (info.affectedRows === 0) throw new ResourceNotFoundErrorModel(product.productId);
    return product;
}

async function deleteProduct(id:number): Promise<void> {
    const product = await getAllProducts();
    const index = product.findIndex(p => p.productId === id);
    if(index === -1) throw new ResourceNotFoundErrorModel(id);
    await fileHandler.deleteFile(product[index].imageName); 
    const sql = `DELETE FROM products WHERE productId = ?`;
    const info:OkPacket = await dal.execute( sql, [id] );
    if(info.affectedRows === 0) throw new ResourceNotFoundErrorModel(id);
}



export default {
    getAllProducts,
    getProductById,
    getProductsByCategory,
    getProductsByName,
    getSumProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getImageNameByProductsId
}
