define(
    'client.ballGame.planes.cannonPlane',
    [
        'utils.canvasUtils',
        'common.ballGame.planes.cannonPlane',
        'client.ballGame.pieces.cannon'
    ],
    function (canvasUtils, CannonPlane, Cannon) {
        function ClientCannonPlane(gameBoard) {
            this.plane = undefined; //canvas plane
            this.gameBoard = gameBoard;

            this.cannon = new Cannon(this.gameBoard, this);

        }

        ClientCannonPlane.prototype.init = function () {
            this.$super();

            this.plane = canvasUtils.createCanvas(this.gameBoard.gameModel.canvasWidth, this.gameBoard.gameModel.canvasHeight);
        };

        ClientCannonPlane.prototype.render = function () {
            this.plane.clear();
            var context = this.plane.context;

            context.save();
            this.gameBoard.viewManager.translateContext(context);

            context.save();
            this.cannon.render(context);
            context.restore();

            context.restore();


        };

        return ClientCannonPlane.extend(CannonPlane);
    }
);