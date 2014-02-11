define(
    ['common.ballGame/gameModel'],
    function (GameModel) {
        function ClientGameModel(boardWidth, boardHeight) {
            this.$super(boardWidth, boardHeight);
            this.elementId = 'ballGameBoard';
            this.clickManager = undefined;
        }


        return ClientGameModel.extend(GameModel);
    }
);