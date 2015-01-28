// Require modules
var gulp = require('gulp'),
    coffee = require('gulp-coffee'),
    sass = require('gulp-sass'),
    compass = require('gulp-compass'),
    gutil = require('gutil'),
    server = require('gulp-express');

// Start express server
gulp.task('server', function () {
  server.run({
    file: 'app.js'
  });
});

// Build sass files
gulp.task('sass', function () {
  gulp.src('./public/sass/screen.scss')
  .pipe(compass({
    css: 'public/css',
    sass: 'public/sass'
  }))
  .pipe(gulp.dest('./public/css'));
});

// Compile coffeescript
gulp.task('coffee', function() {
  gulp.src('./public/coffee/*.coffee')
  .pipe(coffee({bare: true}).on('error', gutil.log))
  .pipe(gulp.dest('./public/js/'))
});

// Run tasks when a file changes
gulp.task('watch', function() {
  gulp.watch('./public/sass/**/*.scss', ['sass']);
  gulp.watch('./public/coffee/**/*.coffee', ['coffee']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'server']);
