define(
    [
        'canvasUtils',
        '../pieces/cannon',
        '../pieces/cannonBall'
    ],
    function (canvasUtils, Cannon, CannonBall) {
        function CannonPlane(gameModel) {
            this.plane = undefined; //canvas plane
            this.gameModel = gameModel;

            this.cannon = new Cannon(this.gameModel, this);
        }

        CannonPlane.prototype.init = function () {
            this.plane = canvasUtils.createCanvas(this.gameModel.boardWidth, this.gameModel.boardHeight);

            this.cannon.init();
        };

        CannonPlane.prototype.render = function () {
            this.plane.clear();
            var context = this.plane.context;

            context.save();

            if (this.gameModel.cannonBall) {
                this.gameModel.cannonBall.render(context);
            }

            this.cannon.render(context);

            context.restore();
        };

        CannonPlane.prototype.tick = function () {

            if (this.gameModel.cannonBall) {
                this.gameModel.cannonBall.tick(context);
            }

            this.cannon.tick();
        };


        CannonPlane.prototype.shootBall = function () {
            this.gameModel.cannonBall = new CannonBall(this.gameModel, this.gameModel.cannonLocation.x, this.gameModel.cannonLocation.y, this.gameModel.cannonAngle+90);
        };

        return CannonPlane;
    }
)
