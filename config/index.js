var path = require('path');
var nconf = require('nconf');

var intel = require('intel');


nconf.argv()
    .env()
    .file({ file: path.join(__dirname, 'config.json') });


module.exports = nconf;
