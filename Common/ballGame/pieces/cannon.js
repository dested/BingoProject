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

        return Cannon.extend(Object);
    }
);