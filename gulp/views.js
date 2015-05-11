'use strict';

// jscs:disable esnext
// jscs:disable disallowKeywords

var gulp    = require('gulp');
var gutil   = require('gulp-util');
var plumber = require('gulp-plumber');
var jade    = require('gulp-jade');


function compileToHtml(paths, livereload) {
    return function() {
        var stream = gulp
            .src([
                paths.views.src + '/*.jade',
                '!' + paths.views.src + '/layout.jade',
            ])
            .pipe(plumber().on('error', gutil.log.bind(gutil, 'views::compile:error')))
            .pipe(jade({
                pretty: true,
            }))
            .pipe(gulp.dest(paths.views.dist))
            .pipe(livereload({start: false}));

        return stream;
    };
}


module.exports = {
    compileToHtml : compileToHtml,
};