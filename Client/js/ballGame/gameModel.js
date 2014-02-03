define(
    [
        'assetLoader',
        './pieces/orb'
    ],
    function (assetLoader, Orb) {
        function GameModel(boardWidth, boardHeight) {
            this.boardWidth = boardWidth;
            this.boardHeight = boardHeight;
            this.elementId = 'ballGameBoard';

            this.background = assetLoader.getAsset('board');
            this.orbs = [];
            for (var i = 0; i < 45; i++) {
                this.orbs.push(
                    new Orb(
                        parseInt(Math.random() * (this.boardWidth - 100)) + 50,
                        parseInt(Math.random() * (this.boardHeight - 100)) + 50
                    )
                );
            }

            this.cannonLocation = {x: this.boardWidth / 2, y: 0};
            this.cannonAngle = 0;

            this.cannonLeftButton = {x: this.boardWidth / 2 - this.boardWidth / 4, y: 100};
            this.cannonRightButton = {x: this.boardWidth / 2 + this.boardWidth / 4, y: 100};


            this.clickManager = undefined;
        }

        return GameModel;
    }
)