var gulp = require('gulp');

require('./gulp/client');
require('./gulp/server');

var runSequence = require('run-sequence');

gulp.task('default',
    [
        'client',
        'server'
    ]
);


gulp.task('client', function (callback) {

    runSequence(
        //   'client.clean',
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

gulp.task('client:prod', function (callback) {

    runSequence(
        //   'client.clean',
        'client.packageImages',/*:prod*/
        [
            'client.packageScripts:prod',
            'client.packageLibs:prod',
            'client.packageHtml',
            'client.packageCss'
        ],
        'client.express',
        callback);
});




gulp.task('server', function (callback) {

    runSequence(
        'server.clean',
        [
            'server.packageScripts',
            'server.packageLibs',
            'server.packageNodeModules'
        ],
        'server.run',
        callback);
});
