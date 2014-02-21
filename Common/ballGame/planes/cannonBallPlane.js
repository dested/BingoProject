define(
  'common.ballGame.planes.cannonBallPlane',
    [
        'common.ballGame.pieces.cannonBall'
    ],
    function ( CannonBall) {
        function CannonBallPlane(gameBoard) {
            this.plane = undefined; //canvas plane
            this.gameBoard = gameBoard;
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
                this.cannonBall = new this.cannonBallInstance(this.gameBoard, this.gameBoard.gameModel.cannonLocation.x, this.gameBoard.gameModel.cannonLocation.y, this.gameBoard.gameModel.cannonAngle + 90);
                this.cannonBall.init();
            }

        };


        return CannonBallPlane.extend(Object);
    }
);
