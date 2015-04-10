"use strict";

var gulp         = require('gulp');
var gutil        = require('gulp-util');


var rename       = require('gulp-rename');
var replace      = require('gulp-replace');
var sourcemaps   = require('gulp-sourcemaps');

var vinylBuffer  = require('vinyl-buffer');
var vinylMap     = require('vinyl-map');
var vinylSource  = require('vinyl-source-stream');

var less         = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var CleanCSS     = require("clean-css");





module.exports = function(paths, livereload) {
  return function() {
    var src  = paths.css.src + '/app.less';
    var dest = paths.css.dist;

    var versionHash = "~" + require('shortid').generate() + "~";

    var minify = vinylMap(function (buff) {
      return new CleanCSS({
        advanced: true,
        aggressiveMerging: true,
        keepBreaks: false,
        shorthandCompacting: true,
        rebase: false,
        debug: false,
      }).minify(buff.toString()).styles;
    });

    var stream = gulp
      .on('error', gutil.log.bind(gutil, 'Less Error'))
      .src(src)
      .pipe(less())
      .pipe(replace('${VERSION}', versionHash))
      .pipe(autoprefixer())
      .pipe(gulp.dest(dest))
      .pipe(minify)
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(dest))

      .pipe(livereload());

    return stream;
  };
};