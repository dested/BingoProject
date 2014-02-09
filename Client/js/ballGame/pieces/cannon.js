define(
    [
        'assetLoader',
        'clickRect'
    ],
    function (assetLoader, ClickRect) {
        function Cannon(gameModel, canonPlane) {
            this.gameModel = gameModel;
            this.cannonAsset = undefined;
            this.canonPlane = canonPlane;
            this.movingCannon = false;
        }


        Cannon.prototype.init = function () {
            this.cannonAsset = assetLoader.getAsset('cannon');

            var cannonButton = this.gameModel.cannonLocation;

            this.gameModel.clickManager.pushClickRect(
                new ClickRect(
                    cannonButton.x - this.cannonAsset.image.width / 2,
                    cannonButton.y - this.cannonAsset.image.height / 2,
                    this.cannonAsset.image.width,
                    this.cannonAsset.image.height,
                    this,
                    this.shootBall
                )
            );

            this.gameModel.clickManager.pushClickRect(
                new ClickRect(
                    0,
                    0,
                    this.gameModel.boardWidth,
                    this.gameModel.boardHeight / 2,
                    this,
                    this.rotateClick
                )
            );


        };

        Cannon.prototype.render = function (context) {
            var cannonLocation = this.gameModel.cannonLocation;

            var cannonImage = this.cannonAsset.image;

            context.save();
            context.translate(cannonLocation.x, cannonLocation.y);
            context.rotate(this.gameModel.cannonAngle * Math.PI / 180);
            context.drawImage(cannonImage, -cannonImage.width / 2, -cannonImage.height / 2);
            context.restore();


        };

        Cannon.prototype.tick = function () {

        };

        Cannon.prototype.rotateClick = function (eventType, clickBox, x, y) {


            switch (eventType) {
                case 'mouseUp':
                    this.movingCannon = false;
                    break;
                case 'mouseDown':
                    this.movingCannon = true;
                case 'mouseMove':
                    if (this.movingCannon) {

                        var angle = (Math.atan2(y - this.gameModel.cannonLocation.y, x - this.gameModel.cannonLocation.x) * 180 / Math.PI)-90;

                        this.gameModel.cannonAngle = angle;
                    }
                    break;
            }

            if (this.gameModel.cannonAngle < -30)this.gameModel.cannonAngle = -30;
            if (this.gameModel.cannonAngle > 30)this.gameModel.cannonAngle = 30;
        };

        Cannon.prototype.shootBall = function (eventType, clickBox, x, y, collide) {
            switch (eventType) {
                case 'mouseUp':
                    if (collide) {
                        this.canonPlane.shootBall();
                        return true;
                    }
                    break;
            }
        };

        return Cannon;
    });