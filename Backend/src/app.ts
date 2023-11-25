import express from "express";
import appConfig from "./2-utils/AppConfig";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import cors from "cors"
import authController from "./6-controllers/auth-controller";
import expressRateLimit from "express-rate-limit";
import helmet from "helmet";
import sanitaize from "./3-middleware/sanitize";
import expressFileUpload from "express-fileupload"
import productsControllers from "./6-controllers/products-controllers";
import categoriesControllers from "./6-controllers/categories-controllers";
import cartsControllers from "./6-controllers/carts-controllers";
import cartsItemControllers from "./6-controllers/cartsItem-controllers";
import ordersControllers from "./6-controllers/orders-controllers";



const server = express();

server.use(expressRateLimit({
    max: 100, 
    windowMs: 100, 
    message: 'Attack attempt detected'
}));

server.use(cors({ origin: appConfig.siteUrl } ));

server.use(helmet());

server.use( express.json());

server.use(expressFileUpload({
    createParentPath: true
}));


server.use(sanitaize);

server.use('/api', authController);

server.use('/api', productsControllers);

server.use('/api', categoriesControllers);

server.use('/api', cartsControllers);

server.use('/api', cartsItemControllers);

server.use('/api', ordersControllers );

server.use('*', routeNotFound);

server.use(catchAll);

server.listen(appConfig.port, () => console.log(`Listening to http://localhost:${appConfig.port}`))