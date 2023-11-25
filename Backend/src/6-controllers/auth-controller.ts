import express, { Request, Response, NextFunction } from "express";
import UserModel from "../4-models/user-model";
import CredentialsModel from "../4-models/credentials-model";
import authLogic from "../5-logic/auth-logic";
import blockNonLoggedIn from "../3-middleware/block-non-logged-in";

const router = express.Router();

router.post("/auth/register",  async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = new UserModel(request.body);
        const token = await authLogic.register(user);
        response.status(201).json(token);
    }
    catch(err: any) {
        next(err);
    }
});

router.post("/auth/login", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const credentials = new CredentialsModel(request.body);
        const token = await authLogic.login(credentials);
        response.json(token);
    }
    catch(err: any) {
        next(err);
    }
});

router.get("/users/:id", [blockNonLoggedIn], async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        const user = await authLogic.getOneUser(id);
        response.json(user);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/userId/:id/email/:email", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        const email = request.params.email;
        const isIdTaken = await authLogic.isIdTaken(id);
        const isEmailTaken = await authLogic.isEmailTaken(email);
        response.json([isIdTaken, isEmailTaken]);
    }
    catch (err: any) {
        next(err);
    }
});



export default router;
