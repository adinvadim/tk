'use strict';

const log = require('../lib/logger');

module.exports = function (req, res, next) {

    res.sendHTTPError = function (error) {

        res.status(error.status);

        if (req.xhr) {
            log.info('res json')
            res.json(error);
        } else {
            log.info('res render')
            res.render("error", {error: error, env: process.env.NODE_ENV});
        }
    }
    next();
}
