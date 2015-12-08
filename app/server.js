'use strict';

const express = require('express');
const config = require('./config');
const log = require('./lib/logger');
const mongoose = require('mongoose');
let app = require('./index.js');



let server = app.listen(config.get('server:port'), function () {

    const mongoose = require('./lib/mongoose');

    var host = server.address().address;
    var port = server.address().port;

    log.info('Example app listening at http://%s:%s', host, port);

});

function connect () {
    return mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:options')).connection;
}

