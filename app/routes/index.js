'use strict';

module.exports = function (app) {
    //app.get('/', require('./indexPage').index);
    //app.get('/userlist', require('./users').list);
    //app.get('/admin/login', admin.login)
    app.use('/', require('./main'));
    app.use('/admin', require('./admin'));
    app.use('/api', require('./api'));
}
