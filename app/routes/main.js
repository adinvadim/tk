'use strict';

const express = require('express');
const log = require('../lib/logger');
let router = express.Router();


router.get('/', function(req, res) {
    res.render('index');
})


router.get('/grid', function(req, res) {
    res.render('grid');
})

module.exports = router;
