define(
    [
        'canvasUtils',
        'common.ballGame/planes/cannonBallPlane',
        '../pieces/clientCannonBall'
    ],
    function (canvasUtils,CannonBallPlane, CannonBall) {
        function ClientCannonBallPlane(gameBoard, gameModel) {
            this.plane = undefined; //canvas plane
            this.gameBoard = gameBoard;
            this.gameModel = gameModel;
            this.cannonBall = undefined;
            this.cannonBallInstance=CannonBall;
        }

        ClientCannonBallPlane.prototype.init = function () {
            this.plane = canvasUtils.createCanvas(this.gameModel.boardWidth, this.gameModel.boardHeight);
        };


        ClientCannonBallPlane.prototype.roundOver = function (finished) {
            this.$super(finished);
            if (finished) {
                this.plane.clear();
            }
        };

        ClientCannonBallPlane.prototype.render = function () {
            if (this.cannonBall) {
                this.plane.clear();
                var context = this.plane.context;
                context.save();

                this.cannonBall.render(context);

                context.restore();
            }
        };


        return ClientCannonBallPlane.extend(CannonBallPlane);
    }
)
