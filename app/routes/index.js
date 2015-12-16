'use strict';

module.exports = function (app) {
    app.use('/', require('./main'));
    app.use('/admin', require('./admin'));
    app.use('/api', require('./api'));
}
