define(
  'client.ballGame.planes.backgroundPlane',
  [
    'utils.canvasUtils',
    'utils.assetLoader'
  ],
  function (canvasUtils,assetLoader) {

    function ClientBackgroundPlane(gameBoard) {
      this.plane = undefined; //canvas plane
      this.gameBoard = gameBoard;
    }

    ClientBackgroundPlane.prototype.init = function () {
      this.plane = canvasUtils.createCanvas(this.gameBoard.gameModel.canvasWidth,this.gameBoard.gameModel.canvasHeight);
    };
    ClientBackgroundPlane.prototype.tick = function () {
    };
    ClientBackgroundPlane.prototype.roundOver = function () {
    };

    ClientBackgroundPlane.prototype.render = function () {


      var context = this.plane.context;

      context.save();
      this.gameBoard.viewManager.translateContext(context);
      context.drawImage(assetLoader.getAsset('board').image,0,0,this.gameBoard.gameModel.boardWidth,this.gameBoard.gameModel.boardHeight);

      context.restore();

    };

    return ClientBackgroundPlane;
  }
);