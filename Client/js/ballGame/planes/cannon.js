define(['canvasUtils'], function (canvasUtils) {
        function CannonPlane(gameModel) {
            this.plane = undefined; //canvas plane
            this.gameModel = gameModel;
        }

        CannonPlane.prototype.init = function () {
            this.plane = canvasUtils.createCanvas(this.gameModel.boardWidth, this.gameModel.boardHeight);

        };

        CannonPlane.prototype.render = function () {
            this.plane.clear();
            var context = this.plane.context;

            context.save();

            this.gameModel.cannon.render(context);

            context.restore();

        };

        return CannonPlane;
    }
)
