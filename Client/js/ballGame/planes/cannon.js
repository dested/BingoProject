define(
    [
        'canvasUtils',
        '../pieces/cannon'
    ],
    function (canvasUtils, Cannon) {
        function CannonPlane(gameBoard, gameModel) {
            this.plane = undefined; //canvas plane
            this.gameModel = gameModel;
            this.gameBoard = gameBoard;

            this.cannon = new Cannon(this.gameModel, this);
        }

        CannonPlane.prototype.init = function () {
            this.plane = canvasUtils.createCanvas(this.gameModel.boardWidth, this.gameModel.boardHeight);

            this.cannon.init();
        };
        CannonPlane.prototype.roundOver = function (finished) {
            if (finished) {
                this.gameModel.cannonAngle = 0;
            }
        };

        CannonPlane.prototype.render = function () {
            this.plane.clear();
            var context = this.plane.context;

            context.save();

            this.cannon.render(context);

            context.restore();
        };

        CannonPlane.prototype.tick = function () {

            this.cannon.tick();
        };


        CannonPlane.prototype.shootBall = function () {
            this.gameBoard.fireCannon()
        };

        return CannonPlane;
    }
)
