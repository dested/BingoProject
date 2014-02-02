define(['canvasUtils'], function (canvasUtils) {
        function OrbsPlane(gameModel) {
            this.plane = undefined; //canvas plane
            this.gameModel = gameModel;
        }

        OrbsPlane.prototype.init = function () {
            this.plane = canvasUtils.createCanvas(this.gameModel.boardWidth, this.gameModel.boardHeight);

        };

        OrbsPlane.prototype.render = function () {
            this.plane.clear();
            var context = this.plane.context;

            for (var i = 0; i < this.gameModel.orbs.length; i++) {
                var orb = this.gameModel.orbs[i];
                orb.render(context);
            }
        };

        return OrbsPlane;
    }
)
