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

    assetLoader.pushAsset('chuteBuckets', '/images/chutes/buckets.png');
    assetLoader.pushAsset('chuteBumpers', '/images/chutes/bumpers.png');

    assetLoader.pushAsset('chuteGreenBucket', '/images/chutes/green_bucket.png');
    assetLoader.pushAsset('chutePurpleBucket', '/images/chutes/purple_bucket.png');
    assetLoader.pushAsset('chuteRedBucket', '/images/chutes/red_bucket.png');
    assetLoader.pushAsset('chuteYellowBucket', '/images/chutes/yellow_bucket.png');
    assetLoader.pushAsset('chuteBlueBucket', '/images/chutes/blue_bucket.png');

    assetLoader.pushAsset('chuteGreenBucketLit', '/images/chutes/green_bucket_lit.png');
    assetLoader.pushAsset('chutePurpleBucketLit', '/images/chutes/purple_bucket_lit.png');
    assetLoader.pushAsset('chuteRedBucketLit', '/images/chutes/red_bucket_lit.png');
    assetLoader.pushAsset('chuteYellowBucketLit', '/images/chutes/yellow_bucket_lit.png');
    assetLoader.pushAsset('chuteBlueBucketLit', '/images/chutes/blue_bucket_lit.png');


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
