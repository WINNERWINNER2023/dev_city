'use strict';

const express = require('express');
const router = express.Router();
const ProductsController = require('../controllers/ProductsController');
// const authMiddleware = require('../middlewares/AuthMiddleware');

const productsController = new ProductsController();

router.get('/api/random', productsController.getRandomProducts);
router.get('/api/products', productsController.getProductsList);
router.get('/api/product/:productId', productsController.getProductDetails);
module.exports = router;
