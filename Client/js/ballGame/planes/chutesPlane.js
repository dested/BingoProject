define(
    'client.ballGame.planes.chutesPlane',
    [
        'utils.canvasUtils',
        'utils.assetLoader',

        'common.ballGame.planes.chutesPlane',
        'client.ballGame.pieces.chute'
    ],
    function (canvasUtils, assetLoader, ChutesPlane, Chute) {

        function ClientChutesPlane(gameBoard) {
            this.backPlane = undefined; //canvas plane
            this.frontPlane = undefined; //canvas plane
            this.gameBoard = gameBoard;

            this.bumpersAsset = undefined;
            this.bucketsAsset = undefined;


            this.chutes = [];
            this.chuteInstance = Chute;
        }

        ClientChutesPlane.prototype.init = function () {
            this.$super();
            this.backPlane = canvasUtils.createCanvas(this.gameBoard.gameModel.canvasWidth, this.gameBoard.gameModel.canvasHeight);
            this.frontPlane = canvasUtils.createCanvas(this.gameBoard.gameModel.canvasWidth, this.gameBoard.gameModel.canvasHeight);
            this.bumpersAsset = assetLoader.getAsset('chuteBumpers');
            this.bucketsAsset = assetLoader.getAsset('chuteBuckets');

        };


        ClientChutesPlane.prototype.render = function () {
            this.backPlane.clear();
            this.frontPlane.clear();

            var backContext = this.backPlane.context;
            var frontContext = this.frontPlane.context;


            backContext.save();
            frontContext.save();

            this.gameBoard.viewManager.translateContext(backContext);
            this.gameBoard.viewManager.translateContext(frontContext);


            backContext.save();
            backContext.translate(0, this.gameBoard.gameModel.boardHeight - this.bumpersAsset.height);
            backContext.drawImage(this.bumpersAsset.image, 0, 0);
            backContext.restore();


            backContext.save();
            backContext.translate(18, this.gameBoard.gameModel.boardHeight - this.bucketsAsset.height);
            backContext.drawImage(this.bucketsAsset.image, 0, 0);
            backContext.restore();


            for (var i = 0; i < this.chutes.length; i++) {
                var chute = this.chutes[i];
                chute.render(frontContext);
            }

            backContext.restore();
            frontContext.restore();


        };

        return ClientChutesPlane.extend(ChutesPlane);
    }
);