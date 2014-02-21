define(
  'common.ballGame.pieces.chute',
    [
    ],
    function ( ) {
        function Chute(gameBoard, chutePlane, chuteIndex, chuteLocation) {
            this.gameBoard = gameBoard;
            this.chuteAssets = [];
            this.chuteAssetsLit = [];
            this.chuteIndex = chuteIndex;
            this.chutePlane = chutePlane;
            this.chuteLocation = chuteLocation;
            this.triggered = false;
            this.blinking = false;
            this.ticking = 0;
            this.chuteNumber = parseInt(Math.random() * 30);
        }


        Chute.prototype.init = function () {

        };

        Chute.prototype.roundOver = function (finished) {
            if (finished) {
                this.triggered = false;
                this.blinking = false;
                this.chuteNumber = parseInt(Math.random() * 30);
            } else {
                if (this.triggered) {
                    this.blinking = true;
                }
            }
        };

        Chute.prototype.tick = function () {

        };


        return Chute.extend(Object);
    });