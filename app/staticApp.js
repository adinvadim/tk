'use strict';

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const config = require('./config');
const posthtml = require('posthtml');
const log = require('./lib/logger');

const env = process.env.NODE_ENV || 'developement'
process.env.NODE_ENV = env

let app = express();

app.set('views', path.join(__dirname, 'bundles'));
app.engine('jade', function (path, options, callback) {
    var html = require('jade').renderFile(path, options);

    var plugins = [
        require('posthtml-bem')(),
    ];

    posthtml(plugins)
        .process(html)
        .then(function (result) {
            if (typeof callback === 'function') {
                var res;
                try {
                    res = result.html
                } catch (ex) {
                    return callback(ex);
                }
                return callback(null, res);
            }
        });
})
app.set('view engine', 'jade');

var winstonStream = {
    write: function(message, encoding){
        log.info(message.slice(0, message.length - 1));
    }
};
app.use(require('./middleware/setEnviroment'));

app.use(logger('dev', { stream: winstonStream }));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(require('./middleware/sendHTTPError'));

app.use(express.static(path.join(__dirname, '../public')));

require('./routes')(app)

app.use(function(req, res, next) {
    res.status(404);
    next(404)
});

app.use(require('./middleware/catchError'));

let server = app.listen(config.get('server:port'), function () {

    var host = server.address().address;
    var port = server.address().port;

    log.info('Example app listening at http://%s:%s', host, port);

});

module.exports = app;
