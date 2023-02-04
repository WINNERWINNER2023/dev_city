'use strict';

require('dotenv').config();
const express = require('express');
const router = express.Router();

const AdminsController = require('../controllers/AdminsController');
const adminsController = new AdminsController();
const ProductsController = require('../controllers/ProductsController');
const productsController = new ProductsController();

const UploadUtil = require('../utils/UploadUtil');
const uploadUtil = new UploadUtil(`${process.env.MULTER_UPLOAD_PATH}/products`);

router.post('/register', adminsController.register);
router.post('/login', adminsController.login);

router.get('/products', productsController.getProducts);
router.post('/products', uploadUtil.multer({ storage: uploadUtil.storage }).array('files'), productsController.createProduct);

module.exports = router;
