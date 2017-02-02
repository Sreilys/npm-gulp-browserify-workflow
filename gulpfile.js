var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    coffee = require('gulp-coffee');

gulp.task('log', function() {
  gutil.log('workflow works');
});

var coffeeSources = ['components/coffee/*.coffee'];
var jsSources = ['components/scripts/template.js'];

gulp.task('coffee', function() {
  gutil.log('coffee task');
  gulp.src(coffeeSources)
    .pipe(coffee({bare: true})
      .on('error', gutil.log))
    .pipe(gulp.dest('components/scripts'));
});

gulp.task('js', function() {
  gulp.src(jsSources)
    .pipe(concat('script.js'))
    .pipe(gulp.dest('builds/development/js'))
});