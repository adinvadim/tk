'use strict';

const express = require('express');
const log = require('../lib/logger');
const path = require('path');
const User = require('../model/user');
const AuthError = require('../lib/errors').AuthError;
const HTTPError = require('../lib/errors').HTTPError;
const checkAuth = require('../middleware/checkAuth');

let router = express.Router();

router.use(express.static(path.join(__dirname, '../../public')));


router.get('/', checkAuth, function(req, res) {
    res.render('admin/index');
})

router.get('/login', function(req, res) {
    res.render('admin/login')
})

router.post('/login', function(req, res, next) {
    let username = req.body.username
    let password = req.body.password
    log.info(`req.xhr = ${req.xhr}`)
    console.log(`req.headers == ${req.headers}`);
    User.authorize(username, password, function(err, user) {
        if (err) {
            if (err instanceof AuthError) {
                return next(new HTTPError(403, err.message));
            } else {
                return next(err);
            }
        }

        req.session.user = user._id;
        res.redirect('./')
    })
})


router.get('/logout', function(req, res, next) {
    req.session.destroy((err) => {
        if (err) return next(err);

        res.redirect('/');
    })
})

module.exports = router;
