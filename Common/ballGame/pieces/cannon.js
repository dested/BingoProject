define(
    [
    ],
    function () {
        function Cannon(gameModel, canonPlane) {
            this.gameModel = gameModel;
            this.cannonAsset = undefined;
            this.canonPlane = canonPlane;
            this.movingCannon = false;
        }


        Cannon.prototype.init = function () {

        };

        Cannon.prototype.tick = function () {

        };
        Cannon.prototype.rotateCannon = function (angle) {
            this.gameModel.cannonAngle = angle;
            if (this.gameModel.cannonAngle < -30)this.gameModel.cannonAngle = -30;
            if (this.gameModel.cannonAngle > 30)this.gameModel.cannonAngle = 30;
        };

        return Cannon.extend(Object);
    }
);