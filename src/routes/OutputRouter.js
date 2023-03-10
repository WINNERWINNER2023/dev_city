'use strict';

const express = require('express');
const router = express.Router();

const OutputController = require('../controllers/OutputController');
const outputController = new OutputController();

router.get('/products', outputController.getProducts);
router.get('/products/:productId', outputController.getProduct);
router.get('/cart', outputController.cart);
router.get("/market", outputController.market)

router.get('/', outputController.main);

module.exports = router;
