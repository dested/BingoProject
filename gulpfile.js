var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var paths = {
  clientScripts: ['Client/js/**/*.js','Common/**/*.js','!**/libs/**','!**/node_modules/**'],
  serverScripts: ['Common/**/*.js','Server/**/*.js','!**/libs/**','!**/node_modules/**']
};


gulp.task('clientScripts', function() {
  return gulp.src(paths.clientScripts)
    .pipe(uglify())
    .pipe(concat('client.min.js'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('serverScripts', function() {
  return gulp.src(paths.serverScripts)
    .pipe(uglify())
    .pipe(concat('server.min.js'))
    .pipe(gulp.dest('build/js'));
});
 
gulp.task('watch', function () {
  gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('default', ['clientScripts','serverScripts']);