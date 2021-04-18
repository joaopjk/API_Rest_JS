import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';

const productsRounter = Router();
const productsController = new ProductsController();

productsRounter.get('/', productsController.index);
productsRounter.get('/:id', productsController.show);
productsRounter.post('/', productsController.create);
productsRounter.update('/:id', productsController.update);
productsRounter.delete('/:id', productsController.delete);

export default productsRounter;
