import { Router } from 'express';
import productsRouter from 'src/modules/products/routes/products.routes';
import usersRouter from 'src/modules/users/routes/users.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);

export default routes;
