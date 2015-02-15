const fs = require('fs'),
	async = require('async'),
	parseString = require('xml2js').parseString,
	path = require('path'),
	_ = require('lodash');

const config = {
	dir: process.argv[2],
};

async.waterfall([
  function(callback) {
    fs.exists(config.dir, function (exists) {
      if (!exists) callback("directory '"+ config.dir +"' does not exist");
      else callback(null);
    });
  },
  function (callback) {
    fs.readdir(config.dir, callback)
  },
  function (files, callback) {
    async.map(files, function (file, mapCallback) {
      fs.rename(path.join(config.dir, file), path.join(config.dir, file.replace(/^(\d{4}__)*/, '')), function (err) {
        if (err) mapCallback(err)
        else mapCallback(null, true)
      });
    }, callback);
  }
], function (err, result) {
   if (err) {
      throw new Error(err);
   }
   console.log('files renamed back.');
 });