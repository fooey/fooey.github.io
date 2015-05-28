'use strict';

// jscs:disable esnext
// jscs:disable disallowKeywords

var gulp         = require('gulp');
var gutil        = require('gulp-util');
var plumber      = require('gulp-plumber');


var rename       = require('gulp-rename');
var sourcemaps   = require('gulp-sourcemaps');

var less         = require('gulp-less');

var postcss      = require('gulp-postcss');

var autoprefixer = require('autoprefixer-core');
var postcssFocus = require('postcss-focus');
var csswring     = require('csswring');







var postcssCore = [
    autoprefixer({browsers: ['last 2 versions', 'ie >= 8']}),
    postcssFocus(),
];

var postcssProd = [
    csswring(),
];




function custom(paths, livereload) {
    return function() {
        var src  = paths.css.src + '/app.less';
        var dest = paths.css.dist;

        var stream = gulp
            .src(src)
            .pipe(plumber().on('error', gutil.log.bind(gutil, 'css::custom:error')))
            .pipe(sourcemaps.init())

            .pipe(less())
            .pipe(postcss(postcssCore))

            .pipe(postcss(postcssProd))
            .pipe(rename({suffix: '.min'}))

            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(dest))

            .pipe(livereload({start: false}));

        return stream;
    };
}



function bootstrap(paths, livereload) {
    return function() {
        var src  = paths.css.src + '/bootstrap/index.less';
        var dest = paths.css.dist;

        var stream = gulp
            .src(src)
            .pipe(plumber().on('error', gutil.log.bind(gutil, 'css::bootstrap:error')))
            .pipe(sourcemaps.init())

            .pipe(less())
            .pipe(postcss(postcssProd))

            .pipe(rename({basename: 'bootstrap.min'}))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(dest))

            .pipe(livereload({start: false}));

        return stream;
    };
}





module.exports = {
    custom   : custom,
    bootstrap: bootstrap,
};