'use strict';

const express = require('express');
const router = express.Router();

// router.get('/test', (req, res) => {
//   // res.render('test/a');
//   res.render('index', { components: 'test/a' });
// });

// router.get('/', (req, res) => {
//   res.render('index')
// });

// router.get('/sample', (req, res) => {
//   res.status(222).json({ result: 'test' });
// });
const SampleController = require('../controllers/sample.controller');
const sampleController = new SampleController();
const sampleMiddleware = require('../middlewares/sample.middleware');

console.log('0-0. routes/index.js를 통해 GET /api/sample에 해당하는 라우터로 이동될 수 있게 세팅된다.');
router.get('/api/sample', sampleMiddleware, sampleController.seonghun);

const outputRouter = require('../routes/output.route');
router.use('/', outputRouter);

module.exports = router;
