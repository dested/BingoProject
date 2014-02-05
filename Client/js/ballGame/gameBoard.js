define([
    'assetLoader',
    'canvasUtils',
    'clickManager',

//planes
    './planes/background',
    './planes/pegs',
    './planes/cannon',

    './gameModel'
], function (assetLoader, canvasUtils, ClickManager, BackgroundPlane, PegsPlane, CannonPlane, GameModel) {


    function GameBoard(boardWidth, boardHeight) {

        this.gameModel = new GameModel(boardWidth, boardHeight);

        //rendering planes
        this.backgroundPlane = new BackgroundPlane(this.gameModel);
        this.pegsPlane = new PegsPlane(this.gameModel);
        this.cannonPlane = new CannonPlane(this.gameModel);

        this.gameModel.clickManager = new ClickManager(this.gameModel);
    }

    GameBoard.prototype.init = function () {
        var ballGameBoard = document.getElementById(this.gameModel.elementId);

        this.backgroundPlane.init();
        ballGameBoard.appendChild(this.backgroundPlane.plane.canvas);

        this.pegsPlane.init();
        ballGameBoard.appendChild(this.pegsPlane.plane.canvas);

        this.cannonPlane.init();
        ballGameBoard.appendChild(this.cannonPlane.plane.canvas);

        this.gameModel.clickManager.init();
        ballGameBoard.appendChild(this.gameModel.clickManager.element);
    };

    GameBoard.prototype.render = function () {
        this.backgroundPlane.render();
        this.pegsPlane.render();
        this.cannonPlane.render();
    };

    GameBoard.prototype.tick = function () {
        this.backgroundPlane.tick();
        this.pegsPlane.tick();
        this.cannonPlane.tick();
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
