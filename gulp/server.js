var gulp = require('gulp');


var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var insert = require('gulp-insert');

var codePaths=['Server/**/*.js','Common/**/*.js','!**/libs/**','!**/node_modules/**'];

var libraryPaths= ['Common/ballGame/libs/**/*.js','Server/libs/**/*.js','Common/libs/**/*.js'];

var serverNodeModulePath = ['Server/node_modules/**/*.*'];


gulp.task('server.clean',function () {
    return  gulp.src('build/server',{read: false})
        .pipe(clean());
});

gulp.task('server.packageLibs',function () {
    return gulp.src(libraryPaths)
        .pipe(gulp.dest('build/server/libs'));
});

gulp.task('server.packageNodeModules',function () {
    return gulp.src(serverNodeModulePath)
        .pipe(gulp.dest('build/server/node_modules'));
});

gulp.task('server.packageScripts',function () {
    return gulp.src(codePaths)
        .pipe(concat('server.min.js'))
        .pipe(insert.append('define("server.game");'))
        .pipe(gulp.dest('build/server'));
});
gulp.task('server.run',function () {

});