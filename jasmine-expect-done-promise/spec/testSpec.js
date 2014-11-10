'use strict';

const
  promiseService = require('../lib/promiseService.js'),
  catchers = require('../lib/catchers.js'),
  util = require('util');

describe('GIVEN resolved (positive) promise ', function () {

   it("WHEN then is called and exception inside THEN exception is thrown", function (done) {
      promiseService.resolvedPromise()
        .then(function (success) {
          expect("something to show expectations failing along with exception").toBe(null);
          throw new Error("something terrible happened");
        })
        .catch(catchers.catcher(done));
    });

});