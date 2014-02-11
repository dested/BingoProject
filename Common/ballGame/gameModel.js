define(
    [
    ],
    function ( ) {
        function GameModel(boardWidth, boardHeight) {
            this.boardWidth = boardWidth;
            this.boardHeight = boardHeight;
            this.pegs = [];
            this.cannonLocation = {x: this.boardWidth / 2, y: 0};
            this.cannonAngle = 0;
            this.jackpotScore = 0;
            this.numberOfCoins = 2567;
            this.numberOfPulls = 15;
            this.interRoundBonus = 0;
        }

        return GameModel.extend(Object);
    }
);