define(['canvasUtils'], function (canvasUtils) {
        function PegsPlane(gameModel) {
            this.plane = undefined; //canvas plane
            this.gameModel = gameModel;
        }

        PegsPlane.prototype.init = function () {
            this.plane = canvasUtils.createCanvas(this.gameModel.boardWidth, this.gameModel.boardHeight);

        };
        PegsPlane.prototype.tick = function () {

        };

        PegsPlane.prototype.render = function () {
            this.plane.clear();
            var context = this.plane.context;

            for (var i = 0; i < this.gameModel.pegs.length; i++) {
                var peg = this.gameModel.pegs[i];
                peg.render(context);
            }
        };

        return PegsPlane;
    }
)
