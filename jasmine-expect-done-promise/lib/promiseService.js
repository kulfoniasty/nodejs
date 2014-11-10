'use strict';

const
  q = require('q');

exports.resolvedPromise = function () {
  var def = q.defer();
  def.resolve({success: 'great success'});
  return def.promise;
};

exports.rejectedPromise = function () {
  var def = q.defer();
  def.reject({rejection: 'rejected :('});
  return def.promise;
};