define(
    'common.ballGame.pieces.cannonBall',
    [
        'common.ballGame.pieces.peg',
        'common.ballGame.pieces.chute'
    ],
    function (Peg, Chute) {
        function CannonBall(gameBoard, x, y, angle) {
            this.gameBoard = gameBoard;
            this.x = x;
            this.y = y;
            this.angle = angle;
            this.velocity = 25;
            this.body = undefined;
            this.ballDead = false;
        }

        CannonBall.prototype.init = function () {
            this.body = this.gameBoard.pegPhysicsManager.createCannonBall(this.x, this.y, this.angle, this.velocity, this);
        };
        CannonBall.prototype.tick = function () {
            if (!this.body.IsAwake()) {
                this.ballDead = true;
                this.gameBoard.pegPhysicsManager.destroyBody(this.body);
                this.gameBoard.roundOver();
            }
        };
        CannonBall.prototype.collide = function (other) {
            if (typeof other === 'string')return;

            if (other.instanceOf(Peg)) {
                other.trigger();
            }


            if (other.instanceOf(Chute)) {
                this.gameBoard.pegPhysicsManager.destroyBody(this.body);
                this.ballDead = true;
                other.triggered = true;
                this.gameBoard.roundOver();
            }
        };

        return CannonBall.extend(Object);
    });