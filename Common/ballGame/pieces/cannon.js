define('common.ballGame.pieces.cannon',
    [
    ],
    function () {
        function Cannon(gameBoard, canonPlane) {
            this.gameBoard = gameBoard;
            this.cannonAsset = undefined;
            this.canonPlane = canonPlane;
            this.movingCannon = false;
        }


        Cannon.prototype.init = function () {

        };

        Cannon.prototype.tick = function () {

        };
        Cannon.prototype.rotateCannon = function (angle) {
            this.gameBoard.gameModel.cannonAngle = angle;
            if (this.gameBoard.gameModel.cannonAngle < -30)this.gameBoard.gameModel.cannonAngle = -30;
            if (this.gameBoard.gameModel.cannonAngle > 30)this.gameBoard.gameModel.cannonAngle = 30;
        };

        return Cannon.extend(Object);
    }
);