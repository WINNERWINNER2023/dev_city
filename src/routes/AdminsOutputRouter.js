'use strict';

const express = require('express');
const router = express.Router();

const AdminsOutputController = require('../controllers/AdminsOutputController');
const adminsOutputController = new AdminsOutputController();

router.get('/', adminsOutputController.main);
router.get('/register', adminsOutputController.register);
router.get('/login', adminsOutputController.login);

router.get('/products/', adminsOutputController.productsList);
router.get('/products/create', adminsOutputController.productsCreate);
router.get('/products/:productId', adminsOutputController.productsDetail);

module.exports = router;
