'use strict';
let User = require('../model/user.js');

exports.list = function(req, res, next) {
    User.find(function (err, users) {
        res.send(users);
    })
};

