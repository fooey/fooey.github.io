'use strict';

var _ = require('lodash');
var nodemon = require('gulp-nodemon');


module.exports = function(options, livereload, cb) {
	var called = false;

	var config = _.merge({
		"execMap": {
			"js": "iojs",
			// "js": "node",
		},
		script: './server.js',
		ext: 'js,jade',
		ignore: [
			'.git/**',
			'gulpfile.js',

			'node_modules/**',
			'public/**',
		],
		env: {
			PORT: '3000',
			NODE_PATH: './',
		},

		delay: 200,
	}, options);


	return nodemon(config)
		.on('start', function() {
			if (!called) {
				called = true;
				cb();
			}
		})
		.on('restart', function() {
			console.log('restarted!');
			livereload();
		});
};