define(
    [
        'canvasUtils',
        '../pieces/cannonBall'
    ],
    function (canvasUtils, CannonBall) {
        function CannonBallPlane(gameBoard, gameModel) {
            this.plane = undefined; //canvas plane
            this.gameBoard = gameBoard;
            this.gameModel = gameModel;
            this.cannonBall = undefined;
        }

        CannonBallPlane.prototype.init = function () {
            this.plane = canvasUtils.createCanvas(this.gameModel.boardWidth, this.gameModel.boardHeight);
        };

        CannonBallPlane.prototype.render = function () {
            if (this.cannonBall) {
                this.plane.clear();
                var context = this.plane.context;
                context.save();

                this.cannonBall.render(context);

                context.restore();
            }
        };

        CannonBallPlane.prototype.tick = function () {
            if (this.cannonBall) {
                this.cannonBall.tick();
            }
        };

        CannonBallPlane.prototype.fireCannonBall = function () {
            if (!this.cannonBall) {
                this.cannonBall = new CannonBall(this.gameBoard, this.gameModel, this.gameModel.cannonLocation.x, this.gameModel.cannonLocation.y, this.gameModel.cannonAngle + 90);
                this.cannonBall.init();
            }

        };


        return CannonBallPlane;
    }
)
