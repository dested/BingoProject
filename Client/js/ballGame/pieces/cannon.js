define(
    [
        'assetLoader',
        'clickRect'
    ],
    function (assetLoader, ClickRect) {
        function Cannon(gameModel, canonPlane) {
            this.gameModel = gameModel;
            this.cannonAsset = undefined;
            this.cannonRotateLeftAsset = undefined;
            this.cannonRotateRightAsset = undefined;

            this.moveCannon = undefined;

            this.canonPlane = canonPlane;
        }


        Cannon.prototype.init = function () {
            this.cannonAsset = assetLoader.getAsset('cannon');
            this.cannonRotateLeftAsset = assetLoader.getAsset('cannonRotateLeft');
            this.cannonRotateRightAsset = assetLoader.getAsset('cannonRotateRight');

            var cannonButton = this.gameModel.cannonLocation;
            var cannonLeftButton = this.gameModel.cannonLeftButton;
            var cannonRightButton = this.gameModel.cannonRightButton;

            this.gameModel.clickManager.pushClickRect(
                new ClickRect(
                    cannonLeftButton.x - this.cannonRotateLeftAsset.image.width / 2,
                    cannonLeftButton.y - this.cannonRotateLeftAsset.image.height / 2,
                    this.cannonRotateLeftAsset.image.width,
                    this.cannonRotateLeftAsset.image.height,
                    this,
                    this.rotateLeft
                )
            );

            this.gameModel.clickManager.pushClickRect(
                new ClickRect(
                    cannonRightButton.x - this.cannonRotateRightAsset.image.width / 2,
                    cannonRightButton.y - this.cannonRotateRightAsset.image.height / 2,
                    this.cannonRotateRightAsset.image.width,
                    this.cannonRotateRightAsset.image.height,
                    this,
                    this.rotateRight
                )
            );

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
        };

        Cannon.prototype.render = function (context) {
            var cannonLocation = this.gameModel.cannonLocation;
            var cannonLeftButton = this.gameModel.cannonLeftButton;
            var cannonRightButton = this.gameModel.cannonRightButton;

            var cannonImage = this.cannonAsset.image;
            var cannonRotateLeftAsset = this.cannonRotateLeftAsset.image;
            var cannonRotateRightAsset = this.cannonRotateRightAsset.image;

            context.save();
            context.translate(cannonLocation.x, cannonLocation.y);
            context.rotate(this.gameModel.cannonAngle * Math.PI / 180);
            context.drawImage(cannonImage, -cannonImage.width / 2, -cannonImage.height / 2);
            context.restore();


            context.save();
            context.translate(cannonLeftButton.x, cannonLeftButton.y);
            context.translate(-cannonRotateLeftAsset.width / 2, -cannonRotateLeftAsset.height / 2);
            context.drawImage(cannonRotateLeftAsset, 0, 0);
            context.restore();


            context.save();
            context.translate(cannonRightButton.x, cannonRightButton.y);
            context.translate(-cannonRotateRightAsset.width / 2, -cannonRotateRightAsset.height / 2);
            context.drawImage(cannonRotateRightAsset, 0, 0);
            context.restore();

        };

        Cannon.prototype.tick = function () {
            if (this.moveCannon) {
                this.gameModel.cannonAngle += this.moveCannon;
            }
        };
        Cannon.prototype.rotateLeft = function (eventType, clickBox, x, y) {
            this.moveCannon = undefined;
            switch (eventType) {
                case 'mouseDown':
                    this.moveCannon = +1;
                    break;
            }
        };

        Cannon.prototype.rotateRight = function (eventType, clickBox, x, y) {
            this.moveCannon = undefined;
            switch (eventType) {
                case 'mouseDown':
                    this.moveCannon = -1;
                    break;
            }
        };

        Cannon.prototype.shootBall = function (eventType, clickBox, x, y, collide) {
            switch (eventType) {
                case 'mouseUp':
                    if (collide) {
                        this.canonPlane.shootBall();
                    }
                    break;
            }
        };

        return Cannon;
    });