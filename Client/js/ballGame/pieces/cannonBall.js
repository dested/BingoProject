define(['assetLoader', './peg'], function (assetLoader, Peg) {
    function CannonBall(gameBoard, gameModel, x, y, angle) {
        this.gameBoard = gameBoard;
        this.gameModel = gameModel;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.velocity = 35;
        this.body = undefined;
    }

    CannonBall.prototype.init = function () {
        this.body = this.gameBoard.pegPhysicsManager.createCannonBall(this.x, this.y, this.angle, this.velocity, this);


    };
    CannonBall.prototype.tick = function () {
    };
    CannonBall.prototype.collide = function (other) {
        if (other instanceof Peg) {
            other.trigger();
        }
    };
    CannonBall.prototype.render = function (context) {

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