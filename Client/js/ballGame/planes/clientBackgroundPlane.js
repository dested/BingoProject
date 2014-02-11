define(['canvasUtils', 'assetLoader'], function (canvasUtils, assetLoader) {
        function ClientBackgroundPlane(gameModel) {
            this.plane = undefined; //canvas plane
            this.gameModel = gameModel;
        }

        ClientBackgroundPlane.prototype.init = function () {
            this.plane = canvasUtils.createCanvas(this.gameModel.boardWidth, this.gameModel.boardHeight);
        };
        ClientBackgroundPlane.prototype.tick = function () {
        };
        ClientBackgroundPlane.prototype.roundOver = function () {
        };

        ClientBackgroundPlane.prototype.render = function () {


            var context = this.plane.context;

            context.save();

            context.drawImage(assetLoader.getAsset('board').image, 0, 0);

            context.restore();

        };

        return ClientBackgroundPlane;
    }
)
