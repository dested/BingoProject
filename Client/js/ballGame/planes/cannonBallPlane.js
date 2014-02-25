define(
    'client.ballGame.planes.cannonBallPlane',
    [
        'utils.canvasUtils',
        'common.ballGame.planes.cannonBallPlane',
        'client.ballGame.pieces.cannonBall'
    ],
    function (canvasUtils, CannonBallPlane, CannonBall) {
        function ClientCannonBallPlane(gameBoard) {
            this.plane = undefined; //canvas plane
            this.gameBoard = gameBoard;
            this.cannonBall = undefined;
            this.cannonBallInstance = CannonBall;
        }

        ClientCannonBallPlane.prototype.init = function () {
            this.$super();
            this.plane = canvasUtils.createCanvas(this.gameBoard.gameModel.canvasWidth, this.gameBoard.gameModel.canvasHeight);
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

                this.gameBoard.viewManager.translateContext(context);

                context.save();
                this.cannonBall.render(context);
                context.restore();

                context.restore();
            }
        };


        return ClientCannonBallPlane.extend(CannonBallPlane);
    }
);