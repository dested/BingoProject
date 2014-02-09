define(['assetLoader', './peg', './chute'], function (assetLoader, Peg, Chute) {
    function CannonBall(gameBoard, gameModel, x, y, angle) {
        this.gameBoard = gameBoard;
        this.gameModel = gameModel;
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
        if (other instanceof Peg) {
            other.trigger();
        }


        if (other instanceof Chute) {
            this.gameBoard.pegPhysicsManager.destroyBody(this.body);
            this.ballDead = true;
            other.triggered = true;
            this.gameBoard.roundOver();
        }
    };
    CannonBall.prototype.render = function (context) {
        if (this.ballDead)return;
        var position = this.body.GetPosition();

        var x = this.gameBoard.pegPhysicsManager.meterToPixel(position.x);
        var y = this.gameBoard.pegPhysicsManager.meterToPixel(position.y);


        context.save();
        context.translate(x, y);
        var image = assetLoader.getAsset('cannonBall').image;
        context.translate(-image.width / 2, -image.height / 2);

        context.translate(image.width / 2, image.height / 2);
        context.rotate(this.body.GetAngle());

        context.drawImage(image, -image.width / 2, -image.height / 2);
        context.restore();
    };

    return CannonBall;
});