define(
    [
        'canvasUtils',
        'common.ballGame/planes/cannonPlane',
        '../pieces/clientCannon'
    ],
    function (canvasUtils,CannonPlane, Cannon) {
        function ClientCannonPlane(gameBoard, gameModel) {
            this.plane = undefined; //canvas plane
            this.gameModel = gameModel;
            this.gameBoard = gameBoard;

            this.cannon = new Cannon(this.gameModel, this);
        }

        ClientCannonPlane.prototype.init = function () {
            this.$super();

            this.plane = canvasUtils.createCanvas(this.gameModel.boardWidth, this.gameModel.boardHeight);
        };

        ClientCannonPlane.prototype.render = function () {
            this.plane.clear();
            var context = this.plane.context;

            context.save();

            this.cannon.render(context);

            context.restore();
        };

        return ClientCannonPlane.extend(CannonPlane);
    }
)
