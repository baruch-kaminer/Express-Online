import express, {Request, Response, NextFunction } from "express";
import categoriesLogic from "../5-logic/categories-logic";



const router = express.Router(); 

router.get('/categories', async( request: Request, response : Response, next : NextFunction ) => {
    try {
        const categories = await categoriesLogic.getCategories();
        response.json(categories);    
    } catch (error) {
        next(error)
    }
});


export default router;