define([
    'assetLoader',
    'canvasUtils',
    'clickManager',

//planes
    './planes/background',
    './planes/pegs',
    './planes/cannon',
    './planes/chutes',
    './planes/cannonBall',
    './planes/overlays',

    './pegPhysicsManager',
    './gameModel'
], function (assetLoader, canvasUtils, ClickManager, BackgroundPlane, PegsPlane, CannonPlane, ChutesPlane, CannonBallPlane, OverlaysPlane, PegPhysicsManager, GameModel) {


    function GameBoard(boardWidth, boardHeight) {

        this.gameModel = new GameModel(boardWidth, boardHeight);

        //rendering planes
        this.backgroundPlane = new BackgroundPlane(this.gameModel);
        this.pegsPlane = new PegsPlane(this, this.gameModel);
        this.cannonBallPlane = new CannonBallPlane(this, this.gameModel);
        this.cannonPlane = new CannonPlane(this, this.gameModel);
        this.chutesPlane = new ChutesPlane(this, this.gameModel);
        this.overlaysPlane = new OverlaysPlane(this, this.gameModel);

        this.pegPhysicsManager = new PegPhysicsManager(this.gameModel, 0);
        this.gameModel.clickManager = new ClickManager(this.gameModel);
    }

    GameBoard.prototype.init = function () {
        var ballGameBoard = document.getElementById(this.gameModel.elementId);

        this.pegPhysicsManager.init();
        this.backgroundPlane.init();
        this.chutesPlane.init();
        this.cannonBallPlane.init();
        this.cannonPlane.init();
        this.pegsPlane.init();
        this.overlaysPlane.init();


        this.pegPhysicsManager.initClient();
        this.backgroundPlane.initClient();
        this.chutesPlane.initClient();
        this.cannonBallPlane.initClient();
        this.cannonPlane.initClient();
        this.pegsPlane.initClient();
        this.overlaysPlane.initClient();
        this.gameModel.clickManager.initClient();

        ballGameBoard.appendChild(this.backgroundPlane.plane.canvas);
        ballGameBoard.appendChild(this.chutesPlane.backPlane.canvas);
        ballGameBoard.appendChild(this.cannonBallPlane.plane.canvas);
        ballGameBoard.appendChild(this.cannonPlane.plane.canvas);
        ballGameBoard.appendChild(this.chutesPlane.frontPlane.canvas);
        ballGameBoard.appendChild(this.pegsPlane.plane.canvas);
        ballGameBoard.appendChild(this.overlaysPlane.plane.canvas);
        ballGameBoard.appendChild(this.pegPhysicsManager.plane.canvas);
        ballGameBoard.appendChild(this.gameModel.clickManager.element);


        var pegLocs = [];
        for (var i = 0; i < 200; i += 50) {
            pegLocs.push({x: 62, y: 201 + i});
            pegLocs.push({x: 101, y: 178 + i});
            pegLocs.push({x: 145, y: 173 + i});
            pegLocs.push({x: 188, y: 184 + i});
            pegLocs.push({x: 226, y: 207 + i});
            pegLocs.push({x: 262, y: 224 + i});
            pegLocs.push({x: 301, y: 235 + i});
            pegLocs.push({x: 345, y: 231 + i});
            pegLocs.push({x: 380, y: 213 + i});
        }
        this.pegsPlane.loadPegs(pegLocs)
    };
    GameBoard.prototype.fireCannon = function () {
        this.cannonBallPlane.fireCannonBall();
    };
    GameBoard.prototype.roundOver = function () {

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

    GameBoard.prototype.render = function () {
        this.pegPhysicsManager.render();
        this.backgroundPlane.render();
        this.cannonPlane.render();
        this.chutesPlane.render();
        this.pegsPlane.render();
        this.overlaysPlane.render();
        this.cannonBallPlane.render();
    };

    GameBoard.prototype.tick = function () {
        this.pegPhysicsManager.tick();
        this.backgroundPlane.tick();
        this.cannonPlane.tick();
        this.chutesPlane.tick();
        this.pegsPlane.tick();
        this.overlaysPlane.tick();
        this.cannonBallPlane.tick();

    };

    return GameBoard;
});

