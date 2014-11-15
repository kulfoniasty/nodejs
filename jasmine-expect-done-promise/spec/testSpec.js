'use strict';

const
  promiseService = require('../lib/promiseService.js'),
  catchers = require('../lib/catchers.js'),
  util = require('util');

describe('GIVEN resolved (positive) promise ', function () {

   it("WHEN then is called and exception inside THEN exception is thrown and stacktrace is taken from the exception", function (done) {
      promiseService.resolvedPromise()
        .then(function (success) {
          expect("something to show expectations failing along with exception").toBe(null);
          throw new Error("something terrible happened");
        })
        .catch(catchers.catcher(done));
    });
});


describe('GIVEN rejected promise ', function () {

   it("WHEN rejected and get to catch THEN exception is has a stacktrace leading to .catch() statement line", function (done) {
      promiseService.rejectedPromise()
        .catch(catchers.catcher(done));
    });
});