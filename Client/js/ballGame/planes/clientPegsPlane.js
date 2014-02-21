define(
  'client.ballGame.planes.pegsPlane',
  [
    'utils.canvasUtils',
    'common.ballGame.planes.pegsPlane',
    'client.ballGame.pieces.peg'
  ],
  function (canvasUtils,PegsPlane,Peg) {
    function ClientPegsPlane(gameBoard) {
      this.plane = undefined; //canvas plane
      this.gameBoard = gameBoard;
      this.pegInstance = Peg;
    }

    ClientPegsPlane.prototype.init = function () {
      this.$super();
      this.plane = canvasUtils.createCanvas(this.gameBoard.gameModel.canvasWidth,this.gameBoard.gameModel.canvasHeight);
    };

    ClientPegsPlane.prototype.render = function () {
      this.plane.clear();
      var context = this.plane.context;

      context.save();

      this.gameBoard.viewManager.translateContext(context);


      for (var i = 0; i < this.gameBoard.gameModel.pegs.length; i++) {
        var peg = this.gameBoard.gameModel.pegs[i];
        peg.render(context);
      }


      for (var i = 0; i < this.gameBoard.gameModel.pegs.length; i++) {
        var peg = this.gameBoard.gameModel.pegs[i];
        peg.renderText(context);
      }
      context.restore();
    };

    return ClientPegsPlane.extend(PegsPlane);
  }
);
