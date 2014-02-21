var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var insert = require('gulp-insert');
var runSequence = require('run-sequence');

var spritesmith = require('gulp.spritesmith');


//var packageImages = require('./gulpPlugins/packageImages');
var clientDir = process.cwd().replace(/\\/g,'/') + '/Client/';

var paths = {
  clientScripts: ['Client/js/**/*.js','Common/**/*.js','!**/libs/**','!**/node_modules/**','build/client/images/sprite.json'],
  serverScripts: ['Common/**/*.js','Server/**/*.js','!**/libs/**','!**/node_modules/**']
};

var libPaths = {
  clientScripts: ['Client/libs/**/*.js','Common/ballGame/libs/**/*.js'],
  serverScripts: ['Server/js/ballGame/libs/**/*.js']
};

var htmlPaths = ['Client/**/*.html'];
var imagePaths = ['Client/images/**/*.png'];
var cssPaths = ['Client/css/**/*.css'];

gulp.task('client.clean',function () {
  return  gulp.src('build/client',{read: false})
    .pipe(clean());
});

gulp.task('client',function (callback) {

  runSequence(
    'client.clean',
    'client.packageImages',
    [
      'client.packageScripts',
      'client.packageLibs',
      'client.packageHtml',
      'client.packageCss'
    ],
    'client.express',
    callback);
});


gulp.task('client.packageScripts',function () {
  return gulp.src(paths.clientScripts)
//    .pipe(uglify())
    .pipe(concat('client.min.js'))
    .pipe(insert.append('require(["client.gameEngine"]);'))
    .pipe(gulp.dest('build/client/js'));
});

gulp.task('client.packageLibs',function () {
  return gulp.src(libPaths.clientScripts)
    .pipe(gulp.dest('build/client/libs'));
});

gulp.task('client.packageImages',function () {
  var spriteData = gulp.src(imagePaths)
    .pipe(spritesmith({
      imgName: 'sprite.png',
      cssName: 'sprite.json'
    }));
  spriteData.img.pipe(gulp.dest('build/client/images'));
  return spriteData.css
    .pipe(insert.transform(function (contents) {
      return 'window.spriteSheetAssets=' + contents.replace(/\\\\/g,'/').replace(new RegExp(clientDir,'g'),'') + ';';
    }))
    .pipe(gulp.dest('build/client/images'));
});
gulp.task('client.packageCss',function () {
  return gulp.src(cssPaths)
    .pipe(gulp.dest('build/client/css'));
});

gulp.task('client.packageHtml',function () {
  return gulp.src(htmlPaths)
    .pipe(gulp.dest('build/client'));
});


gulp.task('server.packageScripts',function () {
  return gulp.src(paths.serverScripts)
//    .pipe(uglify())
    .pipe(concat('server.min.js'))
    .pipe(gulp.dest('build/server/js'));
});

gulp.task('watch',function () {
  gulp.watch(paths.scripts,['scripts']);
});
gulp.task('client.express',function () {


  var express = require('express');
  var http = require('http');
  var path = require('path');


  var app = express();

  app.set('port',3000);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.compress());
  app.use(express.static('build/client'));

  app.use(express.errorHandler());

  http.createServer(app).listen(app.get('port'),function () {
    console.log('Express server listening on port ' + app.get('port'));
  });

});

gulp.task('default',
  [
    'client',
    'server.packageScripts'
  ]
);




