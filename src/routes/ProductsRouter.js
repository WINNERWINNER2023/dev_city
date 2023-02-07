'use strict';

const express = require('express');
const router = express.Router();
const ProductsController = require('../controllers/ProductsController');
// const authMiddleware = require('../middlewares/AuthMiddleware');

const productsController = new ProductsController();

router.get('/random', productsController.getRandomProducts);
router.get('/', productsController.getProductsList);
router.get('/orders', productsController.getOrderedProductsByCustomerId);
router.post('/order', productsController.createOrder);
router.get('/:productId', productsController.getProductDetails);

module.exports = router;
