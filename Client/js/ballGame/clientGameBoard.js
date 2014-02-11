define([
    'assetLoader',
    'canvasUtils',
    'clickManager',
    'common.ballGame/gameBoard',
//planes
    './planes/clientBackgroundPlane',
    './planes/clientPegsPlane',
    './planes/clientCannonPlane',
    './planes/clientChutesPlane',
    './planes/clientCannonBallPlane',
    './planes/clientOverlaysPlane',

    './clientPegPhysicsManager',
    './clientGameModel'
], function (assetLoader, canvasUtils, ClickManager, //
             GameBoard, //
             BackgroundPlane, PegsPlane, CannonPlane, ChutesPlane, CannonBallPlane, OverlaysPlane, //
             PegPhysicsManager, GameModel) {


    function ClientGameBoard(boardWidth, boardHeight) {

        this.gameModel = new GameModel(boardWidth, boardHeight);

        this.backgroundPlane = new BackgroundPlane(this.gameModel);
        this.pegsPlane = new PegsPlane(this, this.gameModel);
        this.cannonBallPlane = new CannonBallPlane(this, this.gameModel);
        this.cannonPlane = new CannonPlane(this, this.gameModel);
        this.chutesPlane = new ChutesPlane(this, this.gameModel);
        this.overlaysPlane = new OverlaysPlane(this, this.gameModel);

        this.pegPhysicsManager = new PegPhysicsManager(this.gameModel, 0);
        this.gameModel.clickManager = new ClickManager(this.gameModel);
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
        ballGameBoard.appendChild(this.pegPhysicsManager.plane.canvas);
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

