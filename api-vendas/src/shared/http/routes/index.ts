import { Router } from 'express';
import productsRouter from 'src/modules/products/routes/products.routes';
import sessionRouter from 'src/modules/users/routes/sessions.route';
import usersRouter from 'src/modules/users/routes/users.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/auth', sessionRouter);

export default routes;
