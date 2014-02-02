define(
    'canvasUtils',
    [],
    function () {
        function _createCanvas(width, height) {

            var canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            var context = canvas.getContext("2d");
            return new Canvas(canvas, context);
        }

        function Canvas(canvas, context) {
            this.canvas = canvas;
            this.context = context;
        }

        Canvas.prototype.clear = function () {
            this.canvas.width = this.canvas.width;
        };

        return {
            createCanvas: _createCanvas
        };
    });




