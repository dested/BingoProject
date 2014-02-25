define(
    'client.ballGame.gameModel',
    [
        'common.ballGame.gameModel'
    ],
    function (GameModel) {
        function ClientGameModel(boardWidth, boardHeight, canvasWidth, canvasHeight) {
            this.$super(boardWidth, boardHeight);
            this.elementId = 'ballGameBoard';
            this.clickManager = undefined;
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
        }


        return ClientGameModel.extend(GameModel);
    }
);