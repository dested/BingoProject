define(
    [
        'canvasUtils',
        '../pieces/peg'
    ],
    function (canvasUtils, Peg) {
        function PegsPlane(gameBoard, gameModel) {
            this.plane = undefined; //canvas plane
            this.gameModel = gameModel;
            this.gameBoard = gameBoard;
        }

        PegsPlane.prototype.init = function () {
            this.plane = canvasUtils.createCanvas(this.gameModel.boardWidth, this.gameModel.boardHeight);

        };

        PegsPlane.prototype.roundOver = function (finished) {
            for (var i = this.gameModel.pegs.length - 1; i >= 0; i--) {
                var peg = this.gameModel.pegs[i];
                peg.roundOver(finished);
                if (finished && peg.hit) {
                    this.gameModel.pegs.splice(i, 1);
                }
            }
        };
        PegsPlane.prototype.loadPegs = function (pegLocations) {
            this.gameModel.pegs = [];//todo if pegs not emtpy...
            for (var i = 0; i < pegLocations.length; i++) {
                var loc = pegLocations[i];
                var peg;
                this.gameModel.pegs.push(peg = new Peg(this.gameBoard, this.gameModel, loc.x, loc.y));
                peg.init();
            }
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


            for (var i = 0; i < this.gameModel.pegs.length; i++) {
                var peg = this.gameModel.pegs[i];
                peg.renderText(context);
            }
        };

        return PegsPlane;
    }
)
