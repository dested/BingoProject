define(['assetLoader'], function (assetLoader) {
    function Peg(gameBoard, x, y) {
        this.x = x;
        this.y = y;
        this.hit = false;
        this.gameBoard = gameBoard;
        this.body = undefined;
    }

    Peg.prototype.init = function () {
        this.body = this.gameBoard.pegPhysicsManager.createPeg(this.x, this.y, this);
    };
    Peg.prototype.trigger = function () {
        this.hit = true;
    };
    Peg.prototype.destroy = function () {
        this.gameBoard.pegPhysicsManager.destroyBody(this.body);
    };
    Peg.prototype.render = function (context) {
        context.save();
        context.translate(this.x, this.y);
        var image;
        if (this.hit) {
            image = assetLoader.getAsset('pegHit').image;
        }
        else {
            image = assetLoader.getAsset('peg').image;
        }
        context.translate(-image.width / 2, -image.height / 2);
        context.drawImage(image, 0, 0);

        context.restore();

    };
    return Peg;
})