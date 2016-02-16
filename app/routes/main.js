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
    let text = req.body.text
    res.mailer.send('email', {
        to: 'tkcoach@yandex.ru',
        from: `${req.body.name} <${req.body.email}>`,
        subject: 'Запрос с сайта по коучингу Spirital  Option',
        text: text,
        name: req.body.name,
        email: req.body.email

    }, function(err) {
        if (err) log.error(err);
        res.send('There was an error sending the email')
    })
})


router.get('/grid', function(req, res) {
    res.render('grid');
})

module.exports = router;
