var through = require('through2');
var gutil = require('gulp-util');
var UglifyJS = require('uglify-js');


// Plugin level function (dealing with files)
function uglifier(steps) {

    var stream = through.obj(function (file, enc, callback) {
        var contents=file.contents.toString();

        global.uglifier={};

        var ast = UglifyJS.parse(contents);



        for (var i = 0; i < steps.length; i++) {
            var step = steps[i];
            if(step.init){
                step.init();
            }
            ast = ast.transform(new UglifyJS.TreeTransformer(null,eval('('+step.method.toString()+')')));
            if(step.done){
                step.done();
            }

        }


        file.contents=new Buffer(ast.print_to_string());

        this.push(file);
        return callback();
    });

    // returning the file stream
    return stream;
};

// Exporting the plugin main function
module.exports = uglifier;