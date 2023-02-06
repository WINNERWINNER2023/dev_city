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

router.post('/register', adminsController.register);
router.post('/login', adminsController.login);

router.get('/products', productsController.adminGetProducts);
router.post('/products', uploadUtil.multer({ storage: uploadUtil.storage }).array('files'), productsController.createProduct);

router.get('/products/:productId', productsController.adminGetProduct);
router.put(
  '/products/:productId',
  uploadUtil.multer({ storage: uploadUtil.storage }).array('files'),
  productsController.updateProduct
);
router.delete('/products/:productId', productsController.deleteProduct);

router.get('/customers', customersController.adminGetCustomers);

router.get('/orders', ordersController.adminGetOrders);

module.exports = router;
