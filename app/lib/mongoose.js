'use strict';

const mongoose = require('mongoose');
const config = require('../config');
const log = require('../lib/logger');

connect()
    .on('error', log.error)
    .on('disconnect', connect)


function connect () {
    return mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:options')).connection;
}
module.exports = mongoose;
