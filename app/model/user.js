'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const async = require('async');
const log = require('../lib/logger');
const AuthError = require('../lib/errors').AuthError;


let UserScheme = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        require: true
    }
});


UserScheme.methods.encryptPassword = function (password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
}

UserScheme.methods.checkPassword = function (password) {
    return this.encryptPassword(password) === this.hashedPassword;
}

UserScheme.statics.authorize = function(username, password, callback) {
   var User = this;

    async.waterfall([
        (callback) => {
            User.findOne({username: username}, callback);
        },
        (user, callback) => {
            if (user) {
                if (user.checkPassword(password)) {
                    callback(null, user);
                } else {
                    callback(new AuthError("Неверный логин или пароль"));
                }
            } else {
                callback(new AuthError("Неверный логин или пароль"));
            }
        }
   ], callback);
};


UserScheme.virtual('password')
    .set(function (password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function () {
        return this._plainPassword;
    });

let User = mongoose.model('User', UserScheme);
module.exports = User;
