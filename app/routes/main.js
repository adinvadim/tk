'use strict';

const express = require('express');
const log = require('../lib/logger');
const config = require('../config');
let router = express.Router();


router.get('/', function(req, res) {
    res.render('index/index', {
        title: "",
    });
})


router.post('/send', function(req, res) {
    let course = req.body.course
    let email = req.body.email
    res.mailer.send('email', {
        to: 'tkcoach@yandex.ru',
        subject: course,
        email: email

    }, function(err) {
        if (err) log.error(err);
        res.send('There was an error sending the email')
    })
})


router.get('/grid', function(req, res) {
    res.render('grid');
})

module.exports = router;
