import express, {Request, Response, NextFunction } from "express";
import CartItemsModel from "../4-models/cartItems-model";
import cartsItemsLogic from "../5-logic/cartsItems-logic";


const router = express.Router(); 


router.get('/cart-items/:id([0-9]+)', async( request: Request, response : Response, next : NextFunction ) => {
    try {
        const cartId = +request.params.id;        
        const cartItems = await cartsItemsLogic.getCartItemsByCartId(cartId);
        response.json(cartItems);
    } catch (error) {
        next(error)
    }
});

router.get('/cart-items/sum-price/:id([0-9]+)', async( request: Request, response : Response, next : NextFunction ) => {
    try {
        const cartId = +request.params.id;
        const sumPrice = await cartsItemsLogic.getSumPriceByCartId(cartId);
        response.json(sumPrice);
    } catch (error) {
        next(error)
    }
});

router.post('/cart-items', async( request: Request, response : Response, next : NextFunction ) => {
    try {
        const cartItem = new CartItemsModel(request.body);
        const newCartItem = await cartsItemsLogic.addCartItem(cartItem);
        response.status(201).json(newCartItem);
    } catch (error) {
        next(error)
    }
});

router.patch('/cart-items', async( request: Request, response : Response, next : NextFunction ) => {
    try {
        const cartItem = new CartItemsModel(request.body);
        const updatedCartItem = await cartsItemsLogic.updateAmountItems(cartItem);
        response.status(201).json(updatedCartItem);
    } catch (error) {
        next(error)
    }
});

router.delete('/cart-items/:id([0-9]+)', async( request: Request, response : Response, next : NextFunction ) => {
    try {
        const cartItemId = +request.params.id;
        await cartsItemsLogic.deleteCartItem(cartItemId);
        response.sendStatus(204);
    } catch (error) {
        next(error)
    }
});

router.delete('/cart-items/cartId/:id([0-9]+)', async( request: Request, response : Response, next : NextFunction ) => {
    try {
        const cartId = +request.params.id;
        await cartsItemsLogic.deleteAllCartItems(cartId);
        response.sendStatus(204);
    } catch (error) {
        next(error)
    }
});



export default router;