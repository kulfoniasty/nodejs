const fs = require('fs'),
	async = require('async'),
	parseString = require('xml2js').parseString,
	path = require('path'),
	_ = require('lodash');

const config = {
	mpl: process.argv[2],
	destDir: path.join(process.cwd(), 'filteredAndOrdered')
};

async.waterfall([
  function(callback) {
		fs.exists(config.mpl, function(exists) {
			if (!exists) {
				callback('playlist file does not exist');
			}
			config.dir = path.dirname(config.mpl);
			callback(null);
		});   
  },
  function (callback) {
    fs.exists(config.destDir, function (exists) {
      if (!exists) {
        fs.mkdir(config.destDir, callback);
      } else {
        callback(null);
      }
    });
  },
	function (callback) {
		fs.readFile(config.mpl, {encoding: 'UTF-8'}, callback);
	},
	function (mplContent, callback) {
		parseString(mplContent, callback);
	},
	function (xmlJson, callback) {
		const entries = xmlJson.smil.body[0].seq[0].media,
			paths = _.pluck(_.pluck(entries, "$"), "src"),
			absolutes = _.map(paths, toAbsolute(config.dir)),
		  toProcess = _.map(absolutes, function (element, n) {
        var prefix = _.padLeft(n, 4, '0'),
          name = path.basename(element),
          strippedPreviousPrefix = name.replace(/^(\d{4}__)*/, '');
        return {
          original: element,
          dir: config.destDir,
          filename: prefix + "__" + strippedPreviousPrefix
        };
		  });
		callback(null, toProcess)
	},
	function (files, callback) {
	  async.map(files, renameFile, function (err, results) {
	    if (err) {
	      callback(err);
	    }
	    callback(null, results);
	  });
	}

], function (err, result) {
    if (err) {
		  throw new Error(err);
	  }
	  console.log('results saved under "' + config.destDir + '"');
});

function toAbsolute(dir) {
	return function (p) {
		if (path.isAbsolute(p)) {
			return p;
		} else {
			return path.join(dir, p);
		}
	};
}

function renameFile(fileInfo, callback) {
  const is = fs.createReadStream(fileInfo.original),
    os = fs.createWriteStream(path.join(fileInfo.dir, fileInfo.filename));
  is.pipe(os);
  is.on('end',function() {
      callback(null, true);
  });
  is.on('error',function(err) {
        callback(err);
  });
  os.on('error',function(err) {
          callback(err);
    });
}
