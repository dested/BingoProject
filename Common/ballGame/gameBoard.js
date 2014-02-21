define(
  'common.ballGame.gameBoard',
  [
//planes
    'common.ballGame.planes.pegsPlane',
    'common.ballGame.planes.cannonPlane',
    'common.ballGame.planes.chutesPlane',
    'common.ballGame.planes.cannonBallPlane',

    'common.ballGame.pegPhysicsManager',
    'common.ballGame.gameModel'
  ],
  function (PegsPlane,CannonPlane,ChutesPlane,CannonBallPlane,PegPhysicsManager,GameModel) {


    function GameBoard(boardWidth,boardHeight) {

      this.gameModel = new GameModel(boardWidth,boardHeight);

      this.pegsPlane = new PegsPlane(this);
      this.cannonBallPlane = new CannonBallPlane(this);
      this.cannonPlane = new CannonPlane(this);
      this.chutesPlane = new ChutesPlane(this);

      this.pegPhysicsManager = new PegPhysicsManager(this);
      this.onRoundOver = function () {
      };
    }

    GameBoard.prototype.init = function () {

      this.pegPhysicsManager.init();
      this.chutesPlane.init();
      this.cannonBallPlane.init();
      this.cannonPlane.init();
      this.pegsPlane.init();

      var type = 0;
      var pegLocs = [];
      for (var i = 0; i < 800; i += 50) {
        pegLocs.push({x: 62,y: 201 + i,type: 0});
        pegLocs.push({x: 101,y: 178 + i,type: 0});
        pegLocs.push({x: 145,y: 173 + i,type: 0});
        pegLocs.push({x: 188,y: 184 + i,type: (type % 5) + 1});
        pegLocs.push({x: 226,y: 207 + i,type: 0});
        pegLocs.push({x: 262,y: 224 + i,type: 0});
        pegLocs.push({x: 301,y: 235 + i,type: 0});
        pegLocs.push({x: 345,y: 231 + i,type: 0});
        pegLocs.push({x: 380,y: 213 + i,type: 0});
        type++;
      }
      this.pegsPlane.loadPegs(pegLocs)
    };
    GameBoard.prototype.fireCannon = function () {
      this.cannonBallPlane.fireCannonBall();
    };
    GameBoard.prototype.roundOver = function () {

      this.pegPhysicsManager.roundOver(false);
      this.cannonPlane.roundOver(false);
      this.chutesPlane.roundOver(false);
      this.pegsPlane.roundOver(false);
      this.cannonBallPlane.roundOver(false);

      this.pegPhysicsManager.roundOver(true);
      this.cannonPlane.roundOver(true);
      this.chutesPlane.roundOver(true);
      this.pegsPlane.roundOver(true);
      this.cannonBallPlane.roundOver(true);
      this.onRoundOver();
    };

    GameBoard.prototype.tick = function () {
      this.pegPhysicsManager.tick();
      this.cannonPlane.tick();
      this.chutesPlane.tick();
      this.pegsPlane.tick();
      this.cannonBallPlane.tick();

    };

    return GameBoard.extend(Object);
  });

