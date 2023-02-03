'use strict';

const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));

const router = require('./routes');
app.use('/', router);
app.get('/*', (req, res) => res.redirect('/'));

module.exports = app;
