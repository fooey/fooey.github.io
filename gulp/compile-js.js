"use strict";

var gulp        = require('gulp');
var gutil       = require('gulp-util');
var _           = require('lodash');


var rename      = require('gulp-rename');
var replace     = require('gulp-replace');
var rimraf      = require('rimraf');
var sourcemaps  = require('gulp-sourcemaps');


var vinylBuffer = require('vinyl-buffer');
var vinylMap    = require('vinyl-map');
var vinylSource = require('vinyl-source-stream');


var watchify    = require('watchify');
var browserify  = require('browserify');
var babelify    = require('babelify');
var uglify      = require('gulp-uglify');





module.exports = function(paths, livereload) {
  var browserifyConfig  = getBrowserifyConfig(paths);
  var browserifyBundler = browserify(browserifyConfig);

  var watchifyBundler = watchify(browserifyBundler)
    .transform(babelify)
    .on('error', gutil.log.bind(gutil, 'Watchify Error'))
    .on('log', function (msg) { console.log('Watchify', 'log', msg); });


  var compileJS = function() {
    return watchifyBundler
      .bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))

      .pipe(vinylSource('app.js'))
      .pipe(vinylBuffer())

      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(paths.js.dist)) // non-minified app.js

      .pipe(sourcemaps.init({loadMaps: true}))

      .pipe(uglifier())

      .pipe(rename({suffix: '.min'}))
      .pipe(sourcemaps.write('./'))

      .pipe(gulp.dest(paths.js.dist)) // minified app.min.js

      .pipe(livereload());
  };

  watchifyBundler.on('update', compileJS);

  return compileJS;
};



function getBrowserifyConfig(paths) {
  return _.defaults(watchify.args, {
    entries       : [paths.js.src + '/app.js'],
    debug         : true,
    bundleExternal: true,
    ignore        : ['request', 'zlib', 'assert', 'buffer', 'util', '_process'],
  });
}



function uglifier() {
  return uglify({
  // report: 'min',
    stripBanners: true,
    mangle      : true,
    compress    : true,
    output: {
      comments  : false,
      beautify  : false,
    },
  }).on('error', gutil.log.bind(gutil, 'Uglify Error'));
}