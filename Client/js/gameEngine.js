define([
    'assetLoader',
    './ballGame/gameBoard',
    './utils/xStats'
], function ( assetLoader,GameBoard) {


    function startGame() {


        var boardWidth = 430;
        var boardHeight = 557;//todo: to object

        var gameBoard = new GameBoard(boardWidth, boardHeight);
        gameBoard.init();


        setInterval(function () {
            gameBoard.render();
        }, 1000 / 60);

        setInterval(function () {
            gameBoard.tick();
        }, 1000 / 60);

    }

    assetLoader.pushAsset('board', '/images/gameBoards/board1.png');
    assetLoader.pushAsset('peg', '/images/pegs/blue_peg.png');
    assetLoader.pushAsset('pegHit', '/images/pegs/blue_peg_lit_overlay.png');

    assetLoader.pushAsset('cannon', '/images/cannons/shooter.png');
    assetLoader.pushAsset('cannonBall', '/images/cannonBalls/ball_noshine.png');


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
