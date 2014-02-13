define(
    [
        'assetLoader',
        'clickRect',
        'common.ballGame/pieces/cannon'
    ],
    function (assetLoader, ClickRect, Cannon) {
        function ClientCannon(gameModel, canonPlane) {
            this.gameModel = gameModel;
            this.cannonAsset = undefined;
            this.canonPlane = canonPlane;
            this.movingCannon = false;
        }


        ClientCannon.prototype.init = function () {
            this.$super();
            this.cannonAsset = assetLoader.getAsset('cannon');

            var cannonButton = this.gameModel.cannonLocation;

            this.gameModel.clickManager.pushClickRect(
                new ClickRect(
                    cannonButton.x - this.cannonAsset.image.width * 2,
                    cannonButton.y,
                    this.cannonAsset.image.width * 4,
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
                    this.gameModel.boardHeight,
                    this,
                    this.rotateClick
                )
            );


        };

        ClientCannon.prototype.render = function (context) {
            var cannonLocation = this.gameModel.cannonLocation;

            var cannonImage = this.cannonAsset.image;


            context.save();
            context.translate(cannonLocation.x - cannonImage.width / 2, cannonLocation.y);
            context.translate(cannonImage.width / 2, -cannonImage.height);

            context.rotate(this.gameModel.cannonAngle * Math.PI / 180);
            context.drawImage(cannonImage, -cannonImage.width / 2, cannonImage.height);
            context.restore();


        };


        ClientCannon.prototype.rotateClick = function (eventType, clickBox, x, y) {


            switch (eventType) {
                case 'mouseUp':
                    this.movingCannon = false;
                    break;
                case 'mouseDown':
                    this.movingCannon = true;
                case 'mouseMove':
                    if (this.movingCannon) {

                        var angle = (Math.atan2(y - this.gameModel.cannonLocation.y, x - this.gameModel.cannonLocation.x) * 180 / Math.PI) - 90;
                        this.rotateCannon(angle);
                    }
                    break;
            }

        };

  

        ClientCannon.prototype.shootBall = function (eventType, clickBox, x, y, collide) {
            switch (eventType) {
                case 'mouseUp':
                    if (collide) {
                        this.canonPlane.shootBall();
                    }
                    break;
                case 'mouseDown':
                case 'mouseMove':
                    if (collide) {
                        return true;
                    }
                    break;
            }
        };
        return ClientCannon.extend(Cannon);
    }
);