define(
  'client.gameEngine',
  [
    'common.extender',
    'utils.assetLoader',
    'client.ballGame.gameBoard',
    'client.utils.stats',
    'client.utils.shims'
  ],
  function (_extender,assetLoader,GameBoard,stats,_shims) {


    function startGame() {
      document.getElementById('loading').parentNode.removeChild(document.getElementById('loading'));

      var boardWidth = 430;
      var boardHeight = 557;//todo: to object

      var gameBoard = new GameBoard(boardWidth,boardHeight * 2,boardWidth,boardHeight);
      window.gameBoard = gameBoard;
      gameBoard.init();

      setInterval(function () {
        gameBoard.tick();
      },1000 / 60);

      var draw = function () {
        window.requestAnimationFrame(draw);
        stats.begin();
        gameBoard.render();
        stats.end();
      };
      window.requestAnimationFrame(draw);

    }


    assetLoader.pushAsset('board','images/gameBoards/board1.png');

    assetLoader.pushAsset('peg.white','images/pegs/white_peg.png',{x: 13,y: 9});
    assetLoader.pushAsset('peg.hit.white','images/pegs/white_peg_lit_overlay.png');

    assetLoader.pushAsset('peg.blue','images/pegs/blue_peg.png',{x: 13,y: 9});
    assetLoader.pushAsset('peg.hit.blue','images/pegs/blue_peg_lit_overlay.png');

    assetLoader.pushAsset('peg.green','images/pegs/green_peg.png',{x: 13,y: 9});
    assetLoader.pushAsset('peg.hit.green','images/pegs/green_peg_lit_overlay.png');

    assetLoader.pushAsset('peg.purple','images/pegs/purple_peg.png',{x: 13,y: 9});
    assetLoader.pushAsset('peg.hit.purple','images/pegs/purple_peg_lit_overlay.png');

    assetLoader.pushAsset('peg.red','images/pegs/red_peg.png',{x: 13,y: 9});
    assetLoader.pushAsset('peg.hit.red','images/pegs/red_peg_lit_overlay.png');

    assetLoader.pushAsset('peg.yellow','images/pegs/yellow_peg.png',{x: 16,y: 8});
    assetLoader.pushAsset('peg.hit.yellow','images/pegs/yellow_peg_lit_overlay.png');


    assetLoader.pushAsset('cannon','images/cannons/shooter.png');
    assetLoader.pushAsset('cannonBall','images/cannonBalls/ball_inner.png');
    assetLoader.pushAsset('cannonBallShine','images/cannonBalls/ball_outer.png');

    assetLoader.pushAsset('chuteBuckets','images/chutes/buckets.png');
    assetLoader.pushAsset('chuteBumpers','images/chutes/bumpers.png');

    assetLoader.pushAsset('chuteGreenBucket','images/chutes/green_bucket.png');
    assetLoader.pushAsset('chutePurpleBucket','images/chutes/purple_bucket.png');
    assetLoader.pushAsset('chuteRedBucket','images/chutes/red_bucket.png');
    assetLoader.pushAsset('chuteYellowBucket','images/chutes/yellow_bucket.png');
    assetLoader.pushAsset('chuteBlueBucket','images/chutes/blue_bucket.png');

    assetLoader.pushAsset('chuteGreenBucketLit','images/chutes/green_bucket_lit.png');
    assetLoader.pushAsset('chutePurpleBucketLit','images/chutes/purple_bucket_lit.png');
    assetLoader.pushAsset('chuteRedBucketLit','images/chutes/red_bucket_lit.png');
    assetLoader.pushAsset('chuteYellowBucketLit','images/chutes/yellow_bucket_lit.png');
    assetLoader.pushAsset('chuteBlueBucketLit','images/chutes/blue_bucket_lit.png');

    assetLoader.pushAsset('jackpotOverlay','images/overlays/jackpot_shooter_overlay.png');
    assetLoader.pushAsset('coinBoxOverlay','images/overlays/coin_box.png');
    assetLoader.pushAsset('pullBoxOverlay','images/overlays/pulls_button.png');

    assetLoader.pushAsset('female.blonde.front','images/people/Female1_FrontDesign.png');
    assetLoader.pushAsset('male.hat.front','images/people/male2_FrontDesign.png');


    assetLoader.loadAssets(startGame);

  });
