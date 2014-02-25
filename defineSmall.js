var fs = require('fs');
var path = require('path');
var UglifyJS = require('uglify-js');


fs.readFile("C:\\junk\\BingoProject\\build\\client\\js\\client.min.js",{encoding: 'utf-8'},function (err,data) {

// in this hash we will map string to a variable name
  var moduleNames = [];
  var imageNames = [];

// here's the transformer:
  var findModules = new UglifyJS.TreeTransformer(null,function (node) {

    if (node instanceof UglifyJS.AST_Call && node.expression instanceof UglifyJS.AST_SymbolRef) {
      if (node.expression.name == 'define') {
        var method = node;
        if (method.args.length == 3) {
          var moduleNumber = moduleNames.length;
          moduleNames.push(method.args[0].value);


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
  });

  var replaceModules = new UglifyJS.TreeTransformer(null,function (node) {

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
              value: moduleNames.indexOf(parm.value)
            });

            parms[i] = number
          }

        } else if (method.args.length == 1) {
          var number = new UglifyJS.AST_Number({
            start: method.args[0].start,
            end: method.args[0].end,
            value: moduleNames.indexOf(method.args[0].value)
          });

          method.args[0] = number

        } else {
          throw new Error("Misdefined Define Method");
        }
      }
    }
  });


  var findImages = new UglifyJS.TreeTransformer(null,function (node) {

    if (node instanceof UglifyJS.AST_Binary && node.left instanceof UglifyJS.AST_Dot) {
      if (node.left.property == 'spriteSheetAssets') {
        for (var i = 0; i < node.right.elements.length; i++) {
          var element = node.right.elements[i];

          for (var e = 0; e < element.properties.length; e++) {
            var prop = element.properties[e];
            if (prop.key == 'image') {
              var imageNumber = imageNames.length;
              imageNames.push(prop.value.value);

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
  });var assetNames=[];

  var replaceImages = new UglifyJS.TreeTransformer(null,function (node) {

          if (node instanceof UglifyJS.AST_Call) {
              if (node.expression.property == 'pushAsset') {
                  var method = node;
                  var moduleNumber = assetNames.length;
                  assetNames.push(method.args[0].value);
                  var number = new UglifyJS.AST_Number({
                      start: method.args[0].start,
                      end: method.args[0].end,
                      value: moduleNumber
                  });
                  method.args[0] = number;
              }
          }
      }
  );


  var ast = UglifyJS.parse(data);

// transform and print
  ast = ast.transform(findModules);
  ast = ast.transform(replaceModules);
  ast = ast.transform(findImages);
  ast = ast.transform(replaceImages);

//  console.log(ast.print_to_string({ beautify: true }));
fs.writeFile("C:\\junk\\BingoProject\\build\\client\\js\\client.min.js",ast.print_to_string());
// also, the change is non-destructive; the original AST remains the same:
//console.log("Original:");
//console.log(ast.print_to_string({ beautify: true }));


});



