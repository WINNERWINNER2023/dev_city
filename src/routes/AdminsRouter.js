'use strict';

require('dotenv').config();
const express = require('express');
const router = express.Router();

const AdminsController = require('../controllers/AdminsController');
const adminsController = new AdminsController();
const ProductsController = require('../controllers/ProductsController');
const productsController = new ProductsController();
const CustomersController = require('../controllers/CustomersController');
const customersController = new CustomersController();
const OrdersController = require('../controllers/OrdersController');
const ordersController = new OrdersController();

const UploadUtil = require('../utils/UploadUtil');
const uploadUtil = new UploadUtil(`${process.env.MULTER_UPLOADS_PATH}/products`);
const adminsAuthMiddleware = require('../middlewares/adminsAuthMiddleware');

router.post('/register', adminsController.register);
router.post('/login', adminsController.login);

router.get('/products', adminsAuthMiddleware, productsController.adminGetProducts);
router.post(
  '/products',
  adminsAuthMiddleware,
  uploadUtil.multer({ storage: uploadUtil.storage }).array('files'),
  productsController.createProduct
);

router.get('/products/:productId', adminsAuthMiddleware, productsController.adminGetProduct);
router.put(
  '/products/:productId',
  adminsAuthMiddleware,
  uploadUtil.multer({ storage: uploadUtil.storage }).array('files'),
  productsController.updateProduct
);
router.delete('/products/:productId', adminsAuthMiddleware, productsController.deleteProduct);

router.get('/customers', adminsAuthMiddleware, customersController.adminGetCustomers);
router.get('/orders', adminsAuthMiddleware, ordersController.adminGetOrders);
router.get('/subOrders', adminsAuthMiddleware, ordersController.adminGetSubOrders);

module.exports = router;
