var gulp = require('gulp'),
    coffee = require('gulp-coffee'),
    sass = require('gulp-sass'),
    gutil = require('gutil'),
    server = require('gulp-express');

gulp.task('server', function () {
  // Start the server at the beginning of the task
  server.run({
    file: 'app.js'
  });
});

gulp.task('sass', function () {
  gulp.src('./public/sass/styles.scss')
  .pipe(sass())
  .pipe(gulp.dest('./public/css'));
});

gulp.task('coffee', function() {
  gulp.src('./public/coffee/*.coffee')
  .pipe(coffee().on('error', gutil.log))
  .pipe(gulp.dest('./public/js/'))
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch('./public/sass/*.scss', ['sass']);
  gulp.watch('./public/coffee/*.coffee', ['coffee']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'server']);
