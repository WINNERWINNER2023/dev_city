'use strict';

const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
  // res.render('test/a');
  res.render('index', { components: 'test/a' });
});

router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
