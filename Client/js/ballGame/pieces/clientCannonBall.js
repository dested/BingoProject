define(
    [
        'assetLoader',
        './clientPeg',
        './clientChute',
        'common.ballGame/pieces/cannonBall'
    ],
    function (assetLoader, Peg, Chute,CannonBall) {
        function ClientCannonBall(gameBoard, gameModel, x, y, angle) {
            this.gameBoard = gameBoard;
            this.gameModel = gameModel;
            this.x = x;
            this.y = y;
            this.angle = angle;
            this.velocity = 25;
            this.body = undefined;
            this.ballDead = false;
        }

        ClientCannonBall.prototype.init = function () {
            this.body = this.gameBoard.pegPhysicsManager.createCannonBall(this.x, this.y, this.angle, this.velocity, this);
        };

        ClientCannonBall.prototype.render = function (context) {
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

        return ClientCannonBall.extend(CannonBall);
    });