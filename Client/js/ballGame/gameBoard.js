define([
    'assetLoader',
    'canvasUtils',
    'clickManager',

//planes
    './planes/background',
    './planes/orbs',
    './planes/cannon',
//objects
    './pieces/orb'
], function (assetLoader, canvasUtils,ClickManager, BackgroundPlane, OrbsPlane, CannonPlane, Orb) {

    function GameModel(boardWidth, boardHeight) {
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.elementId='ballGameBoard';

        this.background = assetLoader.getAsset('board');
        this.orbs = [];
        for (var i = 0; i < 45; i++) {
            this.orbs.push(
                new Orb(
                    parseInt(Math.random() * (this.boardWidth - 100)) + 50,
                    parseInt(Math.random() * (this.boardHeight - 100)) + 50
                )
            );
        }

        this.cannonLocation = {x: this.boardWidth / 2, y: 0};
        this.cannonAngle = 0;

        this.cannonLeftButton = {x: this.boardWidth / 2 - this.boardWidth / 4, y: 100};
        this.cannonRightButton = {x: this.boardWidth / 2 + this.boardWidth / 4, y: 100};


        this.clickManager=undefined;
    }

    function GameBoard(boardWidth, boardHeight) {

        this.gameModel = new GameModel(boardWidth, boardHeight);

        //rendering planes
        this.backgroundPlane = new BackgroundPlane(this.gameModel);
        this.orbsPlane = new OrbsPlane(this.gameModel);
        this.cannonPlane = new CannonPlane(this.gameModel);

        this.gameModel.clickManager=new ClickManager(this.gameModel);
    }

    GameBoard.prototype.init = function () {
        var ballGameBoard = document.getElementById(this.gameModel.elementId);

        this.backgroundPlane.init();
        ballGameBoard.appendChild(this.backgroundPlane.plane.canvas);

        this.orbsPlane.init();
        ballGameBoard.appendChild(this.orbsPlane.plane.canvas);

        this.cannonPlane.init();
        ballGameBoard.appendChild(this.cannonPlane.plane.canvas);

        this.gameModel.clickManager.init();
        ballGameBoard.appendChild(this.gameModel.clickManager.element);




    };

    GameBoard.prototype.render = function () {
        this.backgroundPlane.render();
        this.orbsPlane.render();
        this.cannonPlane.render();
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
