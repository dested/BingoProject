define(
    [
        'canvasUtils',
        '../pieces/clientPeg',
        'common.ballGame/planes/pegsPlane'
    ],
    function (canvasUtils, Peg,PegsPlane) {
        function ClientPegsPlane(gameBoard, gameModel) {
            this.plane = undefined; //canvas plane
            this.gameModel = gameModel;
            this.gameBoard = gameBoard;
            this.pegInstance = Peg;
        }

        ClientPegsPlane.prototype.init = function () {
            this.$super();
            this.plane = canvasUtils.createCanvas(this.gameModel.boardWidth, this.gameModel.boardHeight);
        };

        ClientPegsPlane.prototype.render = function () {
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

        return ClientPegsPlane.extend(PegsPlane);
    }
);
