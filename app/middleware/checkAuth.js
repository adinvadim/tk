'use strict';

const HTTPError = require('../lib/errors').HTTPError;
const log = require('../lib/logger');

module.exports = function (req, res, next) {
    if (!req.session.user) {
        //next(new HTTPError(401));
        res.redirect('./login')
    }
    log.info('Check auth middleware')

    next();
}
