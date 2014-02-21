define(
    'client.ballGame.gameBoard',
    [
        'utils.assetLoader',
        'utils.canvasUtils',
        'utils.clickManager',
        'common.ballGame.gameBoard',
//planes
        'client.ballGame.planes.backgroundPlane',
        'client.ballGame.planes.pegsPlane',
        'client.ballGame.planes.cannonPlane',
        'client.ballGame.planes.chutesPlane',
        'client.ballGame.planes.cannonBallPlane',
        'client.ballGame.planes.overlaysPlane',

        'client.ballGame.pegPhysicsManager',
        'client.ballGame.viewManager',
        'client.ballGame.gameModel'
    ],
    function (assetLoader, canvasUtils, ClickManager, //
              GameBoard, //
              BackgroundPlane, PegsPlane, CannonPlane, ChutesPlane, CannonBallPlane, OverlaysPlane, //
              PegPhysicsManager, ViewManager, GameModel) {


        function ClientGameBoard(boardWidth, boardHeight, canvasWidth, canvasHeight) {

            this.gameModel = new GameModel(boardWidth, boardHeight, canvasWidth, canvasHeight);

            this.backgroundPlane = new BackgroundPlane(this);
            this.pegsPlane = new PegsPlane(this);
            this.cannonBallPlane = new CannonBallPlane(this);
            this.cannonPlane = new CannonPlane(this);
            this.chutesPlane = new ChutesPlane(this);
            this.overlaysPlane = new OverlaysPlane(this);

            this.viewManager = new ViewManager(this);

            this.pegPhysicsManager = new PegPhysicsManager(this, 0);
            this.gameModel.clickManager = new ClickManager(this);
        }

        ClientGameBoard.prototype.init = function () {
            this.$super();
            var ballGameBoard = document.getElementById(this.gameModel.elementId);

            this.backgroundPlane.init();
            this.overlaysPlane.init();
            this.gameModel.clickManager.init();

            ballGameBoard.appendChild(this.backgroundPlane.plane.canvas);
            ballGameBoard.appendChild(this.chutesPlane.backPlane.canvas);
            ballGameBoard.appendChild(this.cannonBallPlane.plane.canvas);
            ballGameBoard.appendChild(this.cannonPlane.plane.canvas);
            ballGameBoard.appendChild(this.chutesPlane.frontPlane.canvas);
            ballGameBoard.appendChild(this.pegsPlane.plane.canvas);
            ballGameBoard.appendChild(this.overlaysPlane.plane.canvas);
            if (this.pegPhysicsManager.plane) {
                ballGameBoard.appendChild(this.pegPhysicsManager.plane.canvas);
            }
            ballGameBoard.appendChild(this.gameModel.clickManager.element);

        };

        ClientGameBoard.prototype.roundOver = function () {

            this.pegPhysicsManager.roundOver(false);
            this.backgroundPlane.roundOver(false);
            this.cannonPlane.roundOver(false);
            this.chutesPlane.roundOver(false);
            this.pegsPlane.roundOver(false);
            this.overlaysPlane.roundOver(false);
            this.cannonBallPlane.roundOver(false);

            setTimeout((function () {
                this.pegPhysicsManager.roundOver(true);
                this.backgroundPlane.roundOver(true);
                this.cannonPlane.roundOver(true);
                this.chutesPlane.roundOver(true);
                this.pegsPlane.roundOver(true);
                this.overlaysPlane.roundOver(true);
                this.cannonBallPlane.roundOver(true);

                this.viewManager.set(0, 0);

            }).bind(this), 2500);
        };

        ClientGameBoard.prototype.render = function () {
            this.pegPhysicsManager.render();
            this.backgroundPlane.render();
            this.cannonPlane.render();
            this.chutesPlane.render();
            this.pegsPlane.render();
            this.overlaysPlane.render();
            this.cannonBallPlane.render();
        };

        ClientGameBoard.prototype.tick = function () {
            this.$super();
            this.backgroundPlane.tick();
            this.overlaysPlane.tick();
        };

        return ClientGameBoard.extend(GameBoard);
    });

