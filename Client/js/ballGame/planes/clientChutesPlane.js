define(
    [
        'canvasUtils',
        'assetLoader',

        'common.ballGame/planes/chutesPlane',
        '../pieces/clientChute'
    ],
    function (canvasUtils, assetLoader,ChutesPlane, Chute) {

        function ClientChutesPlane(gameBoard, gameModel) {
            this.backPlane = undefined; //canvas plane
            this.frontPlane = undefined; //canvas plane
            this.gameModel = gameModel;
            this.gameBoard = gameBoard;

            this.bumpersAsset = undefined;
            this.bucketsAsset = undefined;


            this.chutes = [];
            this.chuteInstance=Chute;
        }

        ClientChutesPlane.prototype.init = function () {
            this.$super();
            this.backPlane = canvasUtils.createCanvas(this.gameModel.boardWidth, this.gameModel.boardHeight);
            this.frontPlane = canvasUtils.createCanvas(this.gameModel.boardWidth, this.gameModel.boardHeight);
            this.bumpersAsset=assetLoader.getAsset('chuteBumpers');
            this.bucketsAsset=assetLoader.getAsset('chuteBuckets');

        };


        ClientChutesPlane.prototype.render = function () {
            this.backPlane.clear();
            this.frontPlane.clear();

            var backContext = this.backPlane.context;
            var frontContext = this.frontPlane.context;

            backContext.save();
            backContext.translate(0, this.gameModel.boardHeight - this.bumpersAsset.height);
            backContext.drawImage(this.bumpersAsset.image, 0, 0);
            backContext.restore();


            backContext.save();
            backContext.translate(18, this.gameModel.boardHeight - this.bucketsAsset.height);
            backContext.drawImage(this.bucketsAsset.image, 0, 0);
            backContext.restore();


            for (var i = 0; i < this.chutes.length; i++) {
                var chute = this.chutes[i];
                chute.render(frontContext);
            }

        };

        return ClientChutesPlane.extend(ChutesPlane);
    }
)
