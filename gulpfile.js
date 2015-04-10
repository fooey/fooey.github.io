"use strict";

var gulp  = require('gulp');
var gutil = require('gulp-util');

var _     = require('lodash');

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
  return nodemon({
    env: {
      NODE_ENV: 'development',
    },
  }, livereload, cb);
});





/*
*
* Tasks Wrappers
*
*/


gulp.task('dev', ['default'], function(cb) {});
gulp.task('default', ['watch', 'compile-css', 'compile-js', 'nodemon'], function(cb) {});

gulp.task('prod', ['watch', 'compile-css', 'compile-js', 'nodemon-prod'], function(cb) {});
