define('common.ballGame.planes.pegsPlane',
    [
        'common.ballGame.pieces.peg'
    ],
    function (Peg) {
        function PegsPlane(gameBoard) {
            this.gameBoard = gameBoard;
            this.pegInstance = Peg;
        }

        PegsPlane.prototype.init = function () {

        };

        PegsPlane.prototype.roundOver = function (finished) {
            for (var i = this.gameBoard.gameModel.pegs.length - 1; i >= 0; i--) {
                var peg = this.gameBoard.gameModel.pegs[i];
                peg.roundOver(finished);
                if (finished && peg.hit) {
                    this.gameBoard.gameModel.pegs.splice(i, 1);
                }
            }
        };
        PegsPlane.prototype.loadPegs = function (pegLocations) {
            this.gameBoard.gameModel.pegs = [];//todo if pegs not emtpy...
            for (var i = 0; i < pegLocations.length; i++) {
                var loc = pegLocations[i];
                var peg;
                this.gameBoard.gameModel.pegs.push(peg = new this.pegInstance(this.gameBoard, loc.x, loc.y, loc.type));
                peg.init();
            }
        };
        PegsPlane.prototype.tick = function () {

        };
        return PegsPlane.extend(Object);
    }
);
