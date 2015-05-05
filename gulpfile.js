'use strict';

// jscs:disable esnext
// jscs:disable disallowKeywords

var gulp       = require('gulp');
var livereload = require('gulp-livereload');



/*
*
* paths
*
*/

var paths      = {};
paths.public   = './public';

paths.css      = {};
paths.css.base = paths.public + '/css';
paths.css.src  = paths.css.base + '/src';
paths.css.dist = paths.css.base + '/dist';

paths.js       = {};
paths.js.base  = paths.public + '/js';
paths.js.src   = paths.js.base + '/src';
paths.js.dist  = paths.js.base + '/dist';






/*
*
* CSS
*
*/

var css = require('./gulp/compile-css');


gulp.task('css-custom', [], css.custom(paths, livereload));
gulp.task('css-bootstrap', [], css.bootstrap(paths, livereload));
// gulp.task('css-compress', [], css.compress(paths, livereload));

gulp.task('build-css', ['css-bootstrap', 'css-custom'/*, 'css-compress'*/], function(cb) {cb()});






/*
*
* JS
*
*/

var buildJS = require('./gulp/compile-js')(paths, livereload);
gulp.task('build-js', [], buildJS);




/*
*
* System
*
*/

gulp.task('watch', [], function() {
    livereload.listen();

    gulp.watch([
        paths.css.src + '/**/*.less',
        '!' + paths.css.src + '/bootstrap/*.less',
    ], ['css-custom']);

    gulp.watch([
        paths.css.src + '/bootstrap/*.less',
    ], ['css-bootstrap']);


    // gulp.watch(paths.css.dist + '/app.min.css', livereload.changed);

    // gulp.watch(paths.js.src + '/**/*.js', ['jsmin']);


    // gulp.watch('./views/**/*.jade', livereload.changed);
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


gulp.task('build-assets', ['build-css', 'build-js'], function(cb) {cb()});

gulp.task('dev', ['default'], function(cb) {cb()});
gulp.task('default', ['nodemon', 'watch', 'build-assets'], function(cb) {cb()});

gulp.task('prod', ['nodemon-prod', 'watch', 'build-assets'], function(cb) {cb()});
