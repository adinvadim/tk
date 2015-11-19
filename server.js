var express = require('express');
var app = require('./app')
var config = require('./config')
var log = require('./lib/logger').getLogger('patrol');

var server = app.listen(config.get('server:port'), function () {

  var host = server.address().address
  var port = server.address().port

  log.info('Example app listening at http://%s:%s', host, port)
  console.log('lol')

});
