'use strict';

exports.catcher = function(done) {
  var e = new Error();
  return function(err){
    done(err.stack !== undefined ? err : e);
  };
};