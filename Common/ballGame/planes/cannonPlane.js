define('common.ballGame.planes.cannonPlane',
    [
        'common.ballGame.pieces.cannon'
    ],
    function (Cannon) {
        function CannonPlane(gameBoard) {
            this.plane = undefined; //canvas plane
            this.gameBoard = gameBoard;

            this.cannon = new Cannon(this.gameBoard, this);
        }

        CannonPlane.prototype.init = function () {
            this.cannon.init();
        };

        CannonPlane.prototype.roundOver = function (finished) {
            if (finished) {
                this.gameBoard.gameModel.cannonAngle = 0;
            }
        };

        CannonPlane.prototype.tick = function () {

            this.cannon.tick();
        };


        CannonPlane.prototype.shootBall = function () {
            this.gameBoard.fireCannon()
        };

        return CannonPlane.extend(Object);
    }
);
