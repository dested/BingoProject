define(
    [
        '../pieces/cannonBall'
    ],
    function ( CannonBall) {
        function CannonBallPlane(gameBoard, gameModel) {
            this.plane = undefined; //canvas plane
            this.gameBoard = gameBoard;
            this.gameModel = gameModel;
            this.cannonBall = undefined;
            this.cannonBallInstance=CannonBall;
        }

        CannonBallPlane.prototype.init = function () {
        };

        CannonBallPlane.prototype.roundOver = function (finished) {
            if (finished) {
                this.cannonBall = undefined; ;
            }
        };

        CannonBallPlane.prototype.tick = function () {
            if (this.cannonBall) {
                this.cannonBall.tick();
            }
        };

        CannonBallPlane.prototype.fireCannonBall = function () {
            if (!this.cannonBall) {
                this.cannonBall = new this.cannonBallInstance(this.gameBoard, this.gameModel, this.gameModel.cannonLocation.x, this.gameModel.cannonLocation.y, this.gameModel.cannonAngle + 90);
                this.cannonBall.init();
            }

        };


        return CannonBallPlane.extend(Object);
    }
);
