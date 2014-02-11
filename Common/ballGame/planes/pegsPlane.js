define(
    [
        '../pieces/peg'
    ],
    function (Peg) {
        function PegsPlane(gameBoard, gameModel) {
            this.gameModel = gameModel;
            this.gameBoard = gameBoard;
            this.pegInstance = Peg;
        }

        PegsPlane.prototype.init = function () {

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
                this.gameModel.pegs.push(peg = new this.pegInstance(this.gameBoard, this.gameModel, loc.x, loc.y));
                peg.init();
            }
        };
        PegsPlane.prototype.tick = function () {

        };
        return PegsPlane.extend(Object);
    }
);