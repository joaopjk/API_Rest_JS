import { Router } from 'express';
import productsRounter from 'src/modules/products/routes/products.routes';

const routes = Router();

routes.use('/products', productsRounter);

export default routes;
