import express, {Request, Response, NextFunction } from "express";
import path from "path";
import fileHendler from "../2-utils/fileHandler";
import { FileNotFoundErrorModel } from "../4-models/error-models";
import verifyAdmin from "../3-middleware/verify-admin";
import productsLogic from "../5-logic/products-logic";
import ProductModel from "../4-models/product-model";


const router = express.Router(); 

router.get('/products', async( request: Request, response : Response, next : NextFunction ) => {
    try {
        const products = await productsLogic.getAllProducts();
        response.json(products);    
    } catch (error) {
        next(error)
    }
});

router.get('/products/:id([0-9]+)', async( request: Request, response : Response, next : NextFunction ) => {
    try {
        const id = +request.params.id;
        const products = await productsLogic.getProductById(id);
        response.json(products);
    } catch (error) {
        next(error)
    }
});

router.get('/products/category/:id([0-9]+)', async( request: Request, response : Response, next : NextFunction ) => {
    try {
        const id = +request.params.id;
        const products = await productsLogic.getProductsByCategory(id);
        response.json(products);
    } catch (error) {
        next(error)
    }
});

router.get('/products/name/:name?', async( request: Request, response : Response, next : NextFunction ) => {
    try {
        const name = request.params.name;
        const products = await productsLogic.getProductsByName(name);
        response.json(products);
    } catch (error) {
        next(error)
    }
});

router.get('/products/sum-products', async( request: Request, response : Response, next : NextFunction ) => {
    try {
        const sum = await productsLogic.getSumProducts();
        response.json(sum[0]["COUNT(*)"]);    
    } catch (error) {
        next(error)
    }
});

router.get('/products/image-name/:id([0-9]+)', async( request: Request, response : Response, next : NextFunction ) => {
    try {
        const id = +request.params.id;
        const imageName = await productsLogic.getImageNameByProductsId(id);
        response.json(imageName);    
    } catch (error) {
        next(error)
    }
});

router.post('/products', verifyAdmin, async( request: Request, response : Response, next : NextFunction ) => {
    try {
        request.body.image = request.files?.image;
        const product = new ProductModel(request.body);
        const newProduct = await productsLogic.addProduct(product);
        response.status(201).json(newProduct);
    } catch (error) {
        next(error)
    }
});

router.patch('/products/:id([0-9]+)', verifyAdmin, async( request: Request, response : Response, next : NextFunction ) => {
    try {
        request.body.productId = +request.params.id;
        request.body.image = request.files?.image;
        const product = new ProductModel(request.body);
        const updatedProduct = await productsLogic.updateProduct(product);
        response.json(updatedProduct);
    } catch (error) {
        next(error)
    }
});

router.delete('/products/:id([0-9]+)', verifyAdmin, async( request: Request, response : Response, next : NextFunction ) => {
    try {
        const id = +request.params.id;
        await productsLogic.deleteProduct(id);
        response.sendStatus(204);
    } catch (error) {
        next(error)
    }
});

router.get('/products/images/:imageName', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        if (!fileHendler.fileExists(imageName)) throw new FileNotFoundErrorModel(imageName)
        const absolutePath = path.join(__dirname, '..', '1-assets', 'images', imageName)
        response.sendFile(absolutePath);
    } catch (error) {
        next(error)
    }
});


export default router;