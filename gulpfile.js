var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    browserify = require('gulp-browserify'),
    coffee = require('gulp-coffee');

gulp.task('log', function() {
  gutil.log('workflow works');
});

var coffeeSources = ['components/coffee/*.coffee'];
var jsSources = ['components/scripts/template.js'];
var sassSources = ['components/sass/style.scss'];

gulp.task('coffee', function() {
  gutil.log('coffee task');
  gulp.src(coffeeSources)
    .pipe(coffee({bare: true})
      .on('error', gutil.log))
    .pipe(gulp.dest('components/scripts'));
});

gulp.task('js', ['coffee'], function() {
  gutil.log('js task');
  gulp.src(jsSources)
    .pipe(concat('script.js'))
    .pipe(browserify())
    .pipe(gulp.dest('builds/development/js'))
    .pipe(connect.reload())
});

gulp.task('sass', function() {
  gutil.log('sass task');
  gulp.src(sassSources)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('builds/development/css'))
    .pipe(connect.reload())
});

gulp.task('watch', function() {
  gutil.log('watch task');
  gulp.watch(coffeeSources, ['coffee']);
  gulp.watch(jsSources, ['js']);
  gulp.watch('components/sass/*.scss', ['sass']);
});

gulp.task('connect', function() {
  gutil.log('connect task');
  connect.server({
    root: 'builds/development',
    livereload: true
  })
});

// default task run just with gulp
gulp.task('default', ['js', 'sass', 'watch', 'connect']);