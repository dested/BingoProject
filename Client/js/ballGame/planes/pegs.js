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
        PegsPlane.prototype.loadPegs = function (pegLocations) {
            this.gameModel.pegs = [];//todo if pegs not emtpy...
            for (var i = 0; i < pegLocations.length; i++) {
                var loc = pegLocations[i];
                var peg;
                this.gameModel.pegs.push(peg=new Peg(this.gameBoard, loc.x, loc.y));
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
        };

        return PegsPlane;
    }
)
