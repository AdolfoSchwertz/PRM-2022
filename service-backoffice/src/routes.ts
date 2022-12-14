import {Router} from 'express'
import BrandController from './controller/BrandController'
import CategoryController from './controller/CategoryController';
import CustomerController from './controller/CustomerController';
import OrderController from './controller/OrderController';
import ProductController from './controller/ProductController';

//instancio o router do express
const routes = Router()

//rotas da brand - endpoint 1
routes.route('/brands')
    .get(BrandController.index)
    .post(BrandController.create);


routes.route('/brands/:id')
    .get(BrandController.show)
    .put(BrandController.update)
    .delete(BrandController.remove);

//rotas da category - endpoint 1
routes.route('/categories')
    .get(CategoryController.index)
    .post(CategoryController.create);


routes.route('/categories/:id')
    .get(CategoryController.show)
    .put(CategoryController.update)
    .delete(CategoryController.remove);


//rotas da product - endpoint 1
routes.route('/products')
    .get(ProductController.index)
    .post(ProductController.create);


routes.route('/products/:id')
    .get(ProductController.show)
    .put(ProductController.update)
    .delete(ProductController.remove);

//rotas da order - endpoint 1
routes.route('/orders')
    .get(OrderController.index)
    .post(OrderController.create);

routes.route('/orders/:id')
    .get(OrderController.show)
    .put(OrderController.canceled)


//rotas da customers - endpoint 1
routes.route('/customers')
    .get(CustomerController.index)
    .post(CustomerController.create);


routes.route('/customers/:id')
    .get(CustomerController.show)
    .put(CustomerController.update)
    .delete(CustomerController.remove);

export default routes