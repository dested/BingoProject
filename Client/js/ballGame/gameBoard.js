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


        var pegLocs = [];
        for (var i = 0; i < 35; i++) {
            pegLocs.push(
                {
                    x: parseInt(Math.random() * (this.gameModel.boardWidth - 50)) + 25,
                    y: parseInt(Math.random() * (this.gameModel.boardHeight - 300)) + 150
                }
            );
        }
        this.pegsPlane.loadPegs(pegLocs)
    };
    GameBoard.prototype.fireCannon = function () {
        this.cannonBallPlane.fireCannonBall();
    };
    GameBoard.prototype.roundOver = function () {
        setTimeout((function () {

            this.pegPhysicsManager.roundOver();
            this.backgroundPlane.roundOver();
            this.cannonPlane.roundOver();
            this.chutesPlane.roundOver();
            this.pegsPlane.roundOver();
            this.overlaysPlane.roundOver();
            this.cannonBallPlane.roundOver();
        }).bind(this), 2000);
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


/*
 this.backgroundPlane.canvas.onmousedown = function (ev) {

 if (ev.y < boardHeight / 2) {
 clicking = true;
 clickingEv = ev;
 }
 };
 this.backgroundPlane.canvas.onmouseup = function (ev) {
 clicking = false;
 };
 this.backgroundPlane.canvas.onclick = function (ev) {
 if (ev.y > boardHeight / 2) {
 currentCannonBall = {
 x: 160 + cannon.width / 2,
 y: 0,
 angle: rotate + 90,
 velocity: 15
 };//todo: to object


 return;
 }
 };*/
