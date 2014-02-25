var gulp = require('gulp');


var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var uglifier = require('./plugins/uglifier');
var tingpng = require('gulp-tinypng');
var clean = require('gulp-clean');
var insert = require('gulp-insert');
var spritesmith = require('gulp.spritesmith');


//var packageImages = require('./gulpPlugins/packageImages');
var clientDir = process.cwd().replace(/\\/g, '/') + '/Client/';

var codePaths = ['Client/js/**/*.js', 'Common/**/*.js', '!**/libs/**', '!**/node_modules/**', 'build/client/images/sprite.json'];

var libraryPaths = ['Client/libs/**/*.js', 'Common/ballGame/libs/**/*.js', 'Common/libs/**/*.js'];

var htmlPaths = ['Client/**/*.html'];
var imagePaths = ['Client/images/**/*.png'];
var cssPaths = ['Client/css/**/*.css'];


gulp.task('client.clean', function () {
    return  gulp.src('build/client', {read: false})
        .pipe(clean());
});


gulp.task('client.packageScripts', function () {
    return gulp.src(codePaths)
        .pipe(concat('client.min.js'))
        .pipe(insert.append('define("client.gameEngine");'))
        .pipe(gulp.dest('build/client/js'));
});


gulp.task('client.packageLibs', function () {
    return gulp.src(libraryPaths)
        .pipe(concat('libs.min.js'))
        .pipe(gulp.dest('build/client/libs'));
});

gulp.task('client.packageImages', function () {
    var spriteData = gulp.src(imagePaths)
        .pipe(spritesmith({
            'algorithm': 'binary-tree',
            imgName: 'sprite.png',
            cssName: 'sprite.json'
        }));
    spriteData.img
//    .pipe(image())
        .pipe(gulp.dest('build/client/images'));
    return spriteData.css
        .pipe(insert.transform(function (contents) {
            var sprites = JSON.parse(contents);
            var _sprites = [];
            for (var spriteName in sprites) {
                var sprite = sprites[spriteName];
                delete sprite["image"];
                delete sprite["total_width"];
                delete sprite["total_height"];
                delete sprite["offset_x"];
                delete sprite["offset_y"];
                delete sprite["px"];
                delete sprite["escaped_image"];
                sprite.image = sprite.source_image.replace(/\\/g, '/').replace(clientDir, '');
                delete sprite["source_image"];
                _sprites.push(sprite);
            }

            return 'window.spriteSheetAssets=' + JSON.stringify(_sprites) + ';';
        }))
        .pipe(gulp.dest('build/client/images'));
});

gulp.task('client.packageCss', function () {
    return gulp.src(cssPaths)
        .pipe(gulp.dest('build/client/css'));
});

gulp.task('client.packageHtml', function () {
    return gulp.src(htmlPaths)
        .pipe(gulp.dest('build/client'));
});


gulp.task('client.express', function () {
    var express = require('express');
    var http = require('http');
    var app = express();
    app.set('port', 3000);
    app.use(express.compress());
    app.use(express.static('build/client'));
    http.createServer(app).listen(app.get('port'), function () {
        console.log('Express server listening on port ' + app.get('port'));
    });
});


gulp.task('client.packageScripts:prod', function () {
    return gulp.src(codePaths)
        .pipe(uglify())
        .pipe(concat('client.min.js'))
        .pipe(insert.append('define("client.gameEngine");'))
        .pipe(uglifier(
            [
                {
                    name: 'findModules',
                    init: function () {
                        uglifier.moduleNames = [];
                    },
                    method: function (node) {

                        if (node instanceof UglifyJS.AST_Call && node.expression instanceof UglifyJS.AST_SymbolRef) {
                            if (node.expression.name == 'define') {
                                var method = node;
                                if (method.args.length == 3) {
                                    var moduleNumber = uglifier.moduleNames.length;
                                    uglifier.moduleNames.push(method.args[0].value);
                                    var number = new UglifyJS.AST_Number({
                                        start: method.args[0].start,
                                        end: method.args[0].end,
                                        value: moduleNumber
                                    });
                                    method.args[0] = number;
                                } else if (method.args.length == 1) {

                                } else {
                                    throw new Error("Misdefined Define Method");
                                }
                            }
                        }
                    }
                },
                {
                    name: 'findModules',
                    method: function (node) {
                        if (node instanceof UglifyJS.AST_Call && node.expression instanceof UglifyJS.AST_SymbolRef) {
                            if (node.expression.name == 'define') {
                                var method = node;
                                if (method.args.length == 3) {
                                    var parms = method.args[1].elements;
                                    for (var i = 0; i < parms.length; i++) {
                                        var parm = parms[i];
                                        var number = new UglifyJS.AST_Number({
                                            start: parms[i].start,
                                            end: parms[i].end,
                                            value: uglifier.moduleNames.indexOf(parm.value)
                                        });
                                        parms[i] = number
                                    }

                                } else if (method.args.length == 1) {
                                    var number = new UglifyJS.AST_Number({
                                        start: method.args[0].start,
                                        end: method.args[0].end,
                                        value: uglifier.moduleNames.indexOf(method.args[0].value)
                                    });

                                    method.args[0] = number

                                } else {
                                    throw new Error("Misdefined Define Method");
                                }
                            }
                        }
                    }
                },
                {
                    name: 'findImages',
                    init: function () {
                        uglifier.imageNames = [];
                    },
                    method: function (node) {
                        if (node instanceof UglifyJS.AST_Binary && node.left instanceof UglifyJS.AST_Dot) {
                            if (node.left.property == 'spriteSheetAssets') {
                                for (var i = 0; i < node.right.elements.length; i++) {
                                    var element = node.right.elements[i];

                                    for (var e = 0; e < element.properties.length; e++) {
                                        var prop = element.properties[e];
                                        if (prop.key == 'image') {
                                            var imageNumber = uglifier.imageNames.length;
                                            uglifier.imageNames.push(prop.value.value);

                                            var number = new UglifyJS.AST_Number({
                                                start: prop.value.start,
                                                end: prop.value.end,
                                                value: imageNumber
                                            });

                                            prop.value = number;
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                {
                    name: 'replaceImages',
                    method: function (node) {

                        if (node instanceof UglifyJS.AST_String) {
                            if (uglifier.imageNames.indexOf(node.value) > -1) {
                                return new UglifyJS.AST_Number({
                                    start: node.start,
                                    end: node.end,
                                    value: uglifier.imageNames.indexOf(node.value)
                                });
                            }
                        }

                    }
                }/*,
             {
             name: 'findAssets',
             init: function () {
             uglifier.assetNames = [];
             },
             method: function (node) {

             if (node instanceof UglifyJS.AST_Call) {
             if (node.expression.property == 'pushAsset') {
             var method = node;
             var moduleNumber = uglifier.assetNames.length;
             uglifier.assetNames.push(method.args[0].value);
             var number = new UglifyJS.AST_Number({
             start: method.args[0].start,
             end: method.args[0].end,
             value: moduleNumber
             });
             method.args[0] = number;
             }
             }
             }
             },
             {
             name: 'replaceAssets',

             method: function (node) {
             if (node instanceof UglifyJS.AST_Call) {
             if (node.expression.property == 'getAsset') {
             var method = node;
             var number = new UglifyJS.AST_Number({
             start: method.args[0].start,
             end: method.args[0].end,
             value: uglifier.assetNames.indexOf(method.args[0].value)
             });
             method.args[0] = number;

             }
             }

             }
             }*/
            ]
        ))
        .pipe(gulp.dest('build/client/js'));
});

gulp.task('client.packageLibs:prod', function () {
    return gulp.src(libraryPaths)
        .pipe(uglify())
        .pipe(concat('libs.min.js'))
        .pipe(gulp.dest('build/client/libs'));
});

gulp.task('client.packageImages:prod', function () {
    var spriteData = gulp.src(imagePaths)
        .pipe(spritesmith({
            'algorithm': 'binary-tree',
            imgName: 'sprite.png',
            cssName: 'sprite.json'
        }));
    spriteData.img
        .pipe(tingpng('AOgdsLk3DEtMgBiTI381cqCszHa-yDHy'))
        .pipe(gulp.dest('build/client/images'));
    return spriteData.css
        .pipe(insert.transform(function (contents) {
            var sprites = JSON.parse(contents);
            var _sprites = [];
            for (var spriteName in sprites) {
                var sprite = sprites[spriteName];
                delete sprite["image"];
                delete sprite["total_width"];
                delete sprite["total_height"];
                delete sprite["offset_x"];
                delete sprite["offset_y"];
                delete sprite["px"];
                delete sprite["escaped_image"];
                sprite.image = sprite.source_image.replace(/\\/g, '/').replace(clientDir, '');
                delete sprite["source_image"];
                _sprites.push(sprite);
            }

            return 'window.spriteSheetAssets=' + JSON.stringify(_sprites) + ';';
        }))
        .pipe(gulp.dest('build/client/images'));
});
