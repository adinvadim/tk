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
const mongoose = require('mongoose');

const log = require('./lib/logger');

let app = express();

app.set('port', config.get('server:port'))
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
app.use(logger('dev', { stream: winstonStream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

let MongoStore = require('connect-mongo')(session);
app.use(session(Object.assign(config.get('session'), {
    store: new MongoStore({mongooseConnection: mongoose.connection})
})))
app.use(express.static(path.join(__dirname, '../public')));

require('./routes')(app)

module.exports = app;
