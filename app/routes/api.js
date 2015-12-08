'use strict';

const express = require('express');
let router = express.Router();
let User = require('../model/user.js');

router.get('/user', function(req, res) {
  User.find( (err, users) => res.send(users) );
})

module.exports = router;
