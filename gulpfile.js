'use strict';

var gulp = require('gulp');
var concatCss = require('gulp-concat-css');

/* Add everything to userChrome */
gulp.task('userChrome_all', function() {
  return gulp.src(['color_variables.css', 'userChrome-files/*.css'])
    .pipe(concatCss('userChrome.css'))
    .pipe(gulp.dest('.'));
});

/* Add everything to userContent */
gulp.task('userContent_all', function() {
  return gulp.src(['color_variables.css', 'userContent-files/all_about_pages.css', 'userContent-files/*/*.css'])
    .pipe(concatCss('userContent.css'))
    .pipe(gulp.dest('.'));
});
