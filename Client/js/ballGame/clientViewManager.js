define(
  'client.ballGame.viewManager',
  [

  ],
  function () {
    function ClientViewManager(gameBoard) {
      this.x = 0;
      this.y = 0;
      this.gameBoard = gameBoard;
      this.viewWidth = this.gameBoard.gameModel.canvasWidth;
      this.viewHeight = this.gameBoard.gameModel.canvasHeight;
      this.paddingBox = {width: 100,height: 100};

    }

    ClientViewManager.prototype.setX = function (x) {
      this.x = x;
    };
    ClientViewManager.prototype.setY = function (y) {
      this.y = y;
    };

    ClientViewManager.prototype.set = function (x,y) {
      this.x = x;
      this.y = y;
    };

    ClientViewManager.prototype.translateContext = function (context) {
      context.translate(-this.x,-this.y);
    };
    function median(values) {

      values.sort(function (a,b) {
        return a - b;
      });

      var half = Math.floor(values.length / 2);

      if (values.length % 2)
        return values[half];
      else
        return (values[half - 1] + values[half]) / 2.0;
    }


    ClientViewManager.prototype.center = function (x,y) {

      var proposedX = median([x - this.viewWidth / 2,x - this.paddingBox.width,x + this.paddingBox.width - this.viewWidth]);
      var proposedY = median([y - this.viewHeight / 2,y - this.paddingBox.height,y + this.paddingBox.height - this.viewHeight]);


      this.x = median([proposedX,0,this.gameBoard.gameModel.boardWidth - this.viewWidth]);
      this.y = median([proposedY,0,this.gameBoard.gameModel.boardHeight - this.viewHeight]);

    };


    return ClientViewManager.extend(Object);
  }
);