'use strict';

const util = require('util');
const http = require('http');

/*
 * HTTPError
 */

function HTTPError(status, message) {
  Error.apply(this, arguments);
  Error.captureStackTrace(this, HTTPError);

  this.status = status
  this.message = message || http.STATUS_CODES[status] || "Error"
}

util.inherits(HTTPError, Error);

HTTPError.prototype.name = 'HTTPError';

exports.HTTPError = HTTPError;

/*
 * AuthError
 */

function AuthError(message) {
  Error.apply(this, arguments);
  Error.captureStackTrace(this, AuthError);

  this.message = message;
}

util.inherits(AuthError, Error);

AuthError.prototype.name = 'AuthError';

exports.AuthError = AuthError;
