import express, {Request, Response, NextFunction } from "express";
import cartsLogic from "../5-logic/carts-logic";
import CartModel from "../4-models/cart-model";



const router = express.Router(); 

router.get('/carts/:id([0-9]+)', async( request: Request, response : Response, next : NextFunction ) => {
    try {
        const usrId = +request.params.id;
        const cart = await cartsLogic.getCartByUser(usrId);
        response.json(cart);    
    } catch (error) {
        next(error)
    }
});

router.get('/carts/is-active/:id([0-9]+)', async( request: Request, response : Response, next : NextFunction ) => {
    try {
        const usrId = +request.params.id;
        const cart = await cartsLogic.getCartByUserIsActive(usrId);
        response.json(cart);    
    } catch (error) {
        next(error)
    }
});

router.post('/carts', async( request: Request, response : Response, next : NextFunction ) => {
    try {
        const cart = new CartModel(request.body)  ;
        const newCart = await cartsLogic.addCart(cart);
        response.status(201).json(newCart);
    } catch (error) {
        next(error)
    }
})

export default router;