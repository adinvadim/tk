'use strict';

const express = require('express');
const log = require('../lib/logger');
let router = express.Router();

router.get('/', function(req, res) {
  res.render('admin');
})


router.post('/login', function(req, res) {
  log.warn(req.body);
})

module.exports = router;
