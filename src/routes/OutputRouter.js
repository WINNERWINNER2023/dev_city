'use strict';

const express = require('express');
const router = express.Router();

const OutputController = require('../controllers/OutputController');
const outputController = new OutputController();

router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
