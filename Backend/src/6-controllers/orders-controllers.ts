import express, { Request, Response, NextFunction } from "express";
import OrderModel from "../4-models/order-model";
import ordersLogic from "../5-logic/orders-logic";



const router = express.Router(); 

router.get('/orders/sun-orders', async( request: Request, response : Response, next : NextFunction ) => {
    try {
        const sum = await ordersLogic.getSumOrders();
        response.json(sum[0]['COUNT(*)']);    
    } catch (error) {
        next(error)
    }
});

router.get('/orders/:id([0-9]+)', async( request: Request, response : Response, next : NextFunction ) => {
    try {
        const userId = +request.params.id;
        const order = await ordersLogic.getLastOrderByUserId(userId);
        response.json(order);
    } catch (error) {
        next(error)
    }
});

router.post('/orders', async( request: Request, response : Response, next : NextFunction ) => {
    try {
        const order = new OrderModel(request.body);
        const newOrder = await ordersLogic.addOrder(order);
        response.status(201).json(newOrder);
    } catch (error) {
        next(error)
    }
});

export default router;