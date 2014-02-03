define(['assetLoader'], function (assetLoader) {
    function CannonBall(gameModel, x, y, angle) {
        this.gameModel = gameModel;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.velocity = 5;

        setInterval((function () {
            this.tick();
        }).bind(this), 1000 / 60);
    }

    CannonBall.prototype.render = function (context) {
        context.save();
        context.translate(this.x, this.y);
        var image = assetLoader.getAsset('cannonBall').image;
        context.translate(-image.width / 2, -image.height / 2);
        context.drawImage(image, 0, 0);

        context.restore();
    };

    CannonBall.prototype.tick = function () {
        var image = assetLoader.getAsset('cannonBall').image;

        this.x += Math.cos(this.angle * Math.PI / 180) * this.velocity;
        this.y += Math.sin(this.angle * Math.PI / 180) * this.velocity;

        var cannonBallBox = {x: this.x - image.width / 2, y: this.y - image.height / 2, width: image.width, height: image.height};
/*
        for (var i = 0; i < ballPieces.length; i++) {
            var ballPiece = ballPieces[i];
            if (!ballPiece.hit) {
                var pieceBox = {x: ballPiece.x - ball.width / 2, y: ballPiece.y - ball.height / 2, width: ball.width, height: ball.height};
                if (boxCollides(pieceBox, cannonBallBox)) {
                    ballPiece.hit = true;
                }
            }
        }


        for (var i = 0; i < collisions.length; i++) {
            var collision = collisions[i];
            if (currentCannonBall.lastCollision === collision) {
                continue;
            }
            if (circleLineCollision(new Vector(currentCannonBall), cannonBall.width / 2, collision.point1, collision.point2)) {
                currentCannonBall.angle = reflect(new Vector(currentCannonBall.angle), collision.vector);
                currentCannonBall.lastCollision = collision;
            }
        }*/

    };


    return CannonBall;
});