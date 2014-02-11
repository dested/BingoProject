define(
    [
        '../pieces/cannon'
    ],
    function ( Cannon) {
        function CannonPlane(gameBoard, gameModel) {
            this.plane = undefined; //canvas plane
            this.gameModel = gameModel;
            this.gameBoard = gameBoard;

            this.cannon = new Cannon(this.gameModel, this);
        }

        CannonPlane.prototype.init = function () {
            this.cannon.init();
        };

        CannonPlane.prototype.roundOver = function (finished) {
            if (finished) {
                this.gameModel.cannonAngle = 0;
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
