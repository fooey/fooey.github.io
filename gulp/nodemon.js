'use strict';

// jscs:disable esnext
// jscs:disable disallowKeywords

var _ = require('lodash');
var nodemon = require('gulp-nodemon');


module.exports = function(options, livereload, cb) {
    var called = false;

    var config = _.merge({
        execMap: {
            js: 'iojs',
        },
        script: './server.js',
        ext: 'js',
        ignore: [
            '.git/**',
            'gulpfile.js',

            'node_modules/**',
            'public/**',
            'gulp/**',
        ],
        env: {
            PORT: '3000',
            NODE_PATH: './',
            NODE_ENV: 'production',
        },

        delay: 200,
    }, options);


    return nodemon(config)
        .on('start', function() {
            livereload.reload('');

            if (!called) {
                called = true;
                cb();
            }
        });
};