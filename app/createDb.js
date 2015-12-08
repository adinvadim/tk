'use strict';

const log = require('./lib/logger');
const async = require('async');
const config = require('./config');
const mongoose = require('./lib/mongoose');

async.series([
    open,
    requireModels,
    dropDatabase,
    createUsers,
], function (err, result) {
    mongoose.disconnect();
    log.info('Close connect with database');
})


function open(callback) {
    log.info('Open database')
    log.info(`Ready state is ${mongoose.connection.readyState}`)
    mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
    log.info('Drop database');
    let db = mongoose.connection.db;
    db.dropDatabase(callback);
}

function requireModels(callback) {
    require('./model/user');
    log.info('Require models');
    async.each(Object.keys(mongoose.models), function (modelName, callback) {
        mongoose.models[modelName].ensureIndexes(callback);
    }, callback);
}

function createUsers(callback) {
    log.info('Create users');

    let users = [
        { username: 'admin', password: 'qwerty'}
    ];

    async.each(users, function (userData, callback) {
        let user = new mongoose.models.User(userData);

        user.save(callback)
    }, callback);
}


