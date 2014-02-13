define(
    [
        'assetLoader',
        './clientPeg',
        './clientChute',
        'common.ballGame/pieces/cannonBall'
    ],
    function (assetLoader, Peg, Chute, CannonBall) {
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

        ClientCannonBall.prototype.render = function (context) {
            if (this.ballDead)return;
            var position = this.body.GetPosition();

            var x = this.gameBoard.pegPhysicsManager.meterToPixel(position.x);
            var y = this.gameBoard.pegPhysicsManager.meterToPixel(position.y);
            var cannonBall = assetLoader.getAsset('cannonBall').image;
            var cannonBallShine = assetLoader.getAsset('cannonBallShine').image;


            context.save();
            context.translate(x, y);

            context.translate(-cannonBall.width / 2, -cannonBall.height / 2);

            context.save();

            context.translate(cannonBall.width / 2, cannonBall.height / 2);
            context.rotate(this.body.GetAngle());

            context.drawImage(cannonBall, -cannonBall.width / 2, -cannonBall.height / 2);
            context.restore();

            context.drawImage(cannonBallShine, 0, 0);
            context.restore();

        };

        return ClientCannonBall.extend(CannonBall);
    });