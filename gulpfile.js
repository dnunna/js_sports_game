'use strict';

var gulp = require('gulp');
var htmlhint = require('gulp-htmlhint');
var css = require('gulp-w3c-css');
const beautify = require('gulp-beautify');
const babel = require('gulp-babel');
var watch = require('gulp-watch');
var about = require('gulp-about');
const headerComment = require('gulp-header-comment');
var dateFormat = require('dateformat');
const urlAdjuster = require('gulp-ex-css-url-adjuster');
var now = new Date();


// This will check all the html files and if there are any errors in format it will display in terminal
gulp.task('htmlhint', function() {
  gulp.src("*.html")
    .pipe(htmlhint())
    .pipe(htmlhint.reporter());
});


// This is a task created for check the css files in css direc and convert them to scss files and place them in scss folder
gulp.task('css', function() {
  return gulp.src('./assets/stylesheets/css/*.css')
    .pipe(css())
    .pipe(gulp.dest('./assets/stylesheets/scss/'));
});

//this task will validate css file for errors
gulp.task('cssvalidate', function() {
  return gulp.src('./assets/stylesheets/css/*.css')
    .pipe(css())
    .pipe(gulp.dest('./build/css'));
});


//this task will convert the files(presets) into es2015 files
gulp.task('babeljs', function() {
  return gulp.src('./assets/javascripts/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./build/babeljs'));
});

//this task will format the js files for indent_size
gulp.task('beautifyjs', function() {
  return gulp.src('./assets/javascripts/*.js')
    .pipe(beautify({
      indent_size: 4
    }))
    .pipe(gulp.dest('./build/beautifyjs'));
});

//this task will get the information about the application from package.json file
gulp.task('about', function() {
  return gulp.src('package.json')
    .pipe(about({
      keys: ['name', 'version', 'author'], // properties to pick from the source
      inject: { // custom properties to inject
        buildDate: dateFormat(now)
      }
    }))
    .pipe(gulp.dest('./build/about')); // writes dist/about.json
});

//this task will add the header comments to all the .js files
gulp.task('headerComment', function() {
  gulp.src('./assets/javascripts/*.js')
    .pipe(headerComment(`
          License: MIT
          Name: js_sports_game
          Version: 1.0.0
          author: Dyumani
  `))
    .pipe(gulp.dest('./build/headerjs'))
});

//this task will convert the image src url relative to the destination path we provide
gulp.task('fixCssUrl', function () {
  return gulp.src('./assets/stylesheets/css/sportsgame.css')
    .pipe(urlAdjuster({

      /* this will only be appended after the relative url */
      prependRelative: 'relative/only',

    }))
    .pipe(gulp.dest('./build/'));
});

gulp.task('default', ['css', 'htmlhint', 'beautifyjs', 'cssvalidate', 'babeljs', 'about', 'headerComment', 'fixCssUrl']);
