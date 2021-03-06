define(
    'client.ballGame.planes.overlaysPlane',
    [
        'utils.canvasUtils',
        'utils.assetLoader'
    ],
    function (canvasUtils, assetLoader) {
        function OverlaysPlane(gameBoard) {
            this.plane = undefined; //canvas plane
            this.gameBoard = gameBoard;

            this.jackpotOverlay = undefined;
            this.coinBoxOverlay = undefined;
            this.pullBoxOverlay = undefined;

            this.jackpotOverlayPosition = {x: this.gameBoard.gameModel.canvasWidth / 2, y: 0};
            this.coinBoxOverlayPosition = {x: 70, y: 0};
            this.pullBoxOverlayPosition = {x: 351, y: 0};
        }

        OverlaysPlane.prototype.init = function () {
            this.plane = canvasUtils.createCanvas(this.gameBoard.gameModel.canvasWidth, this.gameBoard.gameModel.canvasHeight);

            this.jackpotOverlay = assetLoader.getAsset('jackpotOverlay');
            this.coinBoxOverlay = assetLoader.getAsset('coinBoxOverlay');
            this.pullBoxOverlay = assetLoader.getAsset('pullBoxOverlay');

        };

        OverlaysPlane.prototype.roundOver = function (finished) {
            if (finished) {
                this.gameBoard.gameModel.jackpotScore += this.gameBoard.gameModel.interRoundBonus;
                this.gameBoard.gameModel.interRoundBonus = 0;
            }
        };

        OverlaysPlane.prototype.tick = function () {

        };

        OverlaysPlane.prototype.render = function () {
            this.plane.clear();
            var context = this.plane.context;

            renderJackpot.call(this, context);
            renderCoinBox.call(this, context);
            renderPullBox.call(this, context);
        };


        function renderJackpot(context) {
            context.save();
            context.translate(this.jackpotOverlayPosition.x, this.jackpotOverlayPosition.y);
            context.translate(-this.jackpotOverlay.width / 2, 0);
            context.drawImage(this.jackpotOverlay.image, 0, 0);
            context.restore();


            context.save();
            context.translate(this.jackpotOverlayPosition.x, this.jackpotOverlayPosition.y);
            context.translate(0, 46);
            var fontSize = 15;
            context.fillStyle = 'white';
            context.font = 'bold ' + fontSize + 'px Arial';
            var size = context.measureText(this.gameBoard.gameModel.jackpotScore.toString());
            context.fillText(this.gameBoard.gameModel.jackpotScore.toString(), -size.width / 2, -fontSize / 2);
            context.restore();
        }

        function renderCoinBox(context) {
            context.save();
            context.translate(this.coinBoxOverlayPosition.x, this.coinBoxOverlayPosition.y);
            context.translate(-this.coinBoxOverlay.width / 2, 0);
            context.drawImage(this.coinBoxOverlay.image, 0, 0);
            context.restore();


            context.save();
            context.translate(this.coinBoxOverlayPosition.x, this.coinBoxOverlayPosition.y);
            context.translate(0, 33);
            var fontSize = 15;
            context.fillStyle = 'white';
            context.font = 'bold ' + fontSize + 'px Arial';
            var size = context.measureText(this.gameBoard.gameModel.numberOfCoins.toString());
            context.fillText(this.gameBoard.gameModel.numberOfCoins.toString(), -size.width / 2, -fontSize / 2);
            context.restore();
        }

        function renderPullBox(context) {


            context.save();
            context.translate(this.pullBoxOverlayPosition.x, this.pullBoxOverlayPosition.y);
            context.translate(-this.pullBoxOverlay.width / 2, 0);
            context.drawImage(this.pullBoxOverlay.image, 0, 0);
            context.restore();


            context.save();
            context.translate(this.pullBoxOverlayPosition.x, this.pullBoxOverlayPosition.y);
            context.translate(0, 34);
            var fontSize = 15;
            context.fillStyle = 'white';
            context.font = 'bold ' + fontSize + 'px Arial';
            var size = context.measureText(this.gameBoard.gameModel.numberOfPulls.toString());
            context.fillText(this.gameBoard.gameModel.numberOfPulls.toString(), -size.width / 2, -fontSize / 2);
            context.restore();

        }


        return OverlaysPlane;
    }
);