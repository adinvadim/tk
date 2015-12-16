'use strict';

const log = require('../lib/logger');

module.exports = function (req, res, next) {
    req.env = res.locals.env = process.env.NODE_ENV || "development"
    next()
}
