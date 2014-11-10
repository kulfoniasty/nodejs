'use strict';

exports.catcher = function(done) {
  return function(err){
    done(err);
  };
};