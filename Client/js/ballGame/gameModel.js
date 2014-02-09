define(
    [
        'assetLoader'
    ],
    function (assetLoader) {
        function GameModel(boardWidth, boardHeight) {
            this.boardWidth = boardWidth;
            this.boardHeight = boardHeight;
            this.elementId = 'ballGameBoard';

            this.background = assetLoader.getAsset('board');
            this.pegs = [];


            this.cannonLocation = {x: this.boardWidth / 2, y: 0};
            this.cannonAngle = 0;

            this.clickManager = undefined;
        }

        return GameModel;
    }
)