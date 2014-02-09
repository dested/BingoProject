define(['canvasUtils'], function (canvasUtils) {
        function BackgroundPlane(gameModel) {
            this.plane = undefined; //canvas plane
            this.gameModel = gameModel;

            this._drawnBackground = undefined;//currently drawn background
        }

        BackgroundPlane.prototype.init = function () {
            this.plane = canvasUtils.createCanvas(this.gameModel.boardWidth, this.gameModel.boardHeight);
        };

        BackgroundPlane.prototype.tick = function () {
        };
        BackgroundPlane.prototype.roundOver = function () {
        };

        BackgroundPlane.prototype.render = function () {
            if (this._drawnBackground !== this.gameModel.background) {
                this._drawnBackground = this.gameModel.background;

                var context = this.plane.context;

                context.save();

                context.drawImage(this._drawnBackground.image, 0, 0);

                context.restore();

            }
        };

        return BackgroundPlane;
    }
)
