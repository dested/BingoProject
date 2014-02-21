define('client.ballGame.pieces.cannonBall',
    [
        'utils.assetLoader',
        'client.ballGame.pieces.peg',
        'client.ballGame.pieces.chute',
        'common.ballGame.pieces.cannonBall'
    ],
    function (assetLoader, Peg, Chute, CannonBall) {
        function ClientCannonBall(gameBoard, x, y, angle) {
            this.gameBoard = gameBoard;
            this.x = x;
            this.y = y;
            this.angle = angle;
            this.velocity = 25;
            this.body = undefined;
            this.ballDead = false;
        }


        ClientCannonBall.prototype.tick = function () {
            this.$super();
            var position = this.body.GetPosition();
            this.gameBoard.viewManager.center(this.gameBoard.pegPhysicsManager.meterToPixel(position.x), this.gameBoard.pegPhysicsManager.meterToPixel(position.y));
        };

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