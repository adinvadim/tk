'use strict';

const HTTPError = require('../lib/errors').HTTPError;
const log = require('../lib/logger');
const errorHandler = require('errorhandler');


module.exports = function (err, req, res, next) {
    if (typeof err == 'number') {
        err = new HTTPError(err);
    }

    if (err instanceof HTTPError) {
        res.sendHTTPError(err);
    } else {
        if (req.env === 'development') {
            errorHandler()(err, req, res, next);
        } else {
            log.error(err);
            err = new HTTPError(500);
            res.sendHTTPError(err);
        }
    }
}
