define([
    'assetLoader',
    './ballGame/gameBoard',
    './utils/xStats'
], function ( assetLoader,GameBoard) {


    function startGame() {


        var boardWidth = 438;
        var boardHeight = 548;//todo: to object

        var gameBoard = new GameBoard(boardWidth, boardHeight);
        gameBoard.init();


        setInterval(function () {
            gameBoard.render();
        }, 1000 / 60);

    }

    assetLoader.pushAsset('board', '/images/gameBoards/board1.png');
    assetLoader.pushAsset('cannon', '/images/cannons/cannon1.png');
    assetLoader.pushAsset('orb', '/images/balls/ball1.png');
    assetLoader.pushAsset('orbHit', '/images/balls/ball1Hit.png');
    assetLoader.pushAsset('cannonBall', '/images/cannonBalls/cannonBall1.png');
    assetLoader.loadAssets(startGame);


});


/*


 $(function(){
 var socket = io.connect('http://localhost');
 socket.on('news', function (data) {
 console.log(data);
 socket.emit('my other event', { my: 'data' });
 });
 });

 //canvas stuff here*/
