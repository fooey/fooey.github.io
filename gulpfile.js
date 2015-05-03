'use strict';

// jscs:disable esnext
// jscs:disable disallowKeywords

var gulp  = require('gulp');
// var gutil = require('gulp-util');

// var _     = require('lodash');

var livereload = require('gulp-livereload');



/*
*
* paths
*
*/

var paths = {};
paths.public = './public';

paths.css = {};
paths.css.base = paths.public + '/css';
paths.css.src  = paths.css.base + '/src';
paths.css.dist = paths.css.base + '/dist';

paths.js = {};
paths.js.base = paths.public + '/js';
paths.js.src  = paths.js.base + '/src';
paths.js.dist = paths.js.base + '/dist';






/*
*
* CSS
*
*/

var compileCSS = require('./gulp/compile-css')(paths, livereload);
gulp.task('compile-css', [], compileCSS);






/*
*
* JS
*
*/

var compileJS = require('./gulp/compile-js')(paths, livereload);
gulp.task('compile-js', [], compileJS);




/*
*
* System
*
*/

gulp.task('watch', [], function() {
    livereload({start: true});

    gulp.watch(paths.css.src + '/**/*.less', ['compile-css']);
    // gulp.watch(paths.js.src + '/**/*.js', ['jsmin']);
    gulp.watch('./views/**/*.jade', livereload.changed);
});




/*
*
* nodemon
*
*/

var nodemon = require('./gulp/nodemon');

gulp.task('nodemon', function(cb) {
    var options = {
        env: {
            NODE_ENV: 'development',
        },
    };
    return nodemon(options, livereload, cb);
});
gulp.task('nodemon-prod', function(cb) {
    var options = {
        env: {
            NODE_ENV: 'production',
            NEW_RELIC_NO_CONFIG_FILE: true,
            NEW_RELIC_LICENSE_KEY: null,
            NEW_RELIC_APP_NAME: ['jasonrushton.com'],
            NEW_RELIC_LOG: 'stdout',
            NEW_RELIC_LOG_LEVEL: 'info',
        },
    };
    return nodemon(options, livereload, cb);
});





/*
*
* Tasks Wrappers
*
*/


gulp.task('dev', ['default'], function(cb) {cb()});
gulp.task('default', ['watch', 'compile-css', 'compile-js', 'nodemon'], function(cb) {cb()});

gulp.task('prod', ['watch', 'compile-css', 'compile-js', 'nodemon-prod'], function(cb) {cb()});
