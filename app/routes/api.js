'use strict';

const express = require('express');
const path = require('path');
let router = express.Router();
let User = require('../model/user.js');


router.use(express.static(path.join(__dirname, '../../public')));

router.get('/user', function(req, res) {
  User.find( (err, users) => res.send(users) );
})

module.exports = router;
