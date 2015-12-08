'use strict';
const winston = require('winston');
const path = require('path');

let logger = new winston.Logger({
  transports: [
      new winston.transports.Console({
            colorize: true
          })
    ],
    exitOnError: false
});

module.exports = logger;
