define('client.ballGame.pieces.cannon',
    [
        'utils.assetLoader',
        'utils.clickRect',
        'common.ballGame.pieces.cannon'
    ],
    function (assetLoader, ClickRect, Cannon) {
        function ClientCannon(gameBoard, canonPlane) {
            this.gameBoard = gameBoard;
            this.cannonAsset = undefined;
            this.canonPlane = canonPlane;
            this.movingCannon = false;
            this.ticking = 0;

        }


        ClientCannon.prototype.init = function () {
            this.$super();
            this.cannonAsset = assetLoader.getAsset('cannon');

            var cannonButton = this.gameBoard.gameModel.cannonLocation;

            this.gameBoard.gameModel.clickManager.pushClickRect(
                new ClickRect(
                        cannonButton.x - this.cannonAsset.image.width * 2,
                    cannonButton.y,
                        this.cannonAsset.image.width * 4,
                    this.cannonAsset.image.height,
                    this,
                    this.shootBall
                )
            );

            this.gameBoard.gameModel.clickManager.pushClickRect(
                new ClickRect(
                    0,
                    0,
                    this.gameBoard.gameModel.boardWidth,
                    this.gameBoard.gameModel.boardHeight,
                    this,
                    this.rotateClick
                )
            );


        };


        ClientCannon.prototype.render = function (context) {
            var cannonLocation = this.gameBoard.gameModel.cannonLocation;

            var cannonImage = this.cannonAsset.image;


            context.save();
            context.translate(cannonLocation.x - cannonImage.width / 2, cannonLocation.y);
            context.translate(cannonImage.width / 2, -cannonImage.height);

            context.rotate(this.gameBoard.gameModel.cannonAngle * Math.PI / 180);
            context.drawImage(cannonImage, -cannonImage.width / 2, cannonImage.height);
            context.restore();


            if (this.gameBoard.gameModel.showPeople) {
                this.ticking += 2;

                context.save();

                var person = assetLoader.getAsset('female.blonde.front');

                context.translate((-this.ticking + (this.gameBoard.gameModel.canvasWidth * 100)) % this.gameBoard.gameModel.canvasWidth, 100);

                context.translate(person.width / 2, person.height / 2);


                if (this.ticking % 20 < 10) {
                    context.rotate(.07);
                    context.drawImage(person.image, -person.width / 2, -person.height / 2)
                } else {
                    context.rotate(-.07);
                    context.drawImage(person.image, -person.width / 2, -person.height / 2)
                }

                context.restore();


                context.save();

                var person = assetLoader.getAsset('male.hat.front');

                context.translate((this.ticking + (this.gameBoard.gameModel.canvasWidth * 100)) % this.gameBoard.gameModel.canvasWidth, 200);

                context.translate(person.width / 2, person.height / 2);


                if (this.ticking % 20 < 10) {
                    context.rotate(.07);
                    context.scale(-1, 1);
                    context.drawImage(person.image, -person.width / 2, -person.height / 2)
                } else {
                    context.rotate(-.07);
                    context.scale(-1, 1);
                    context.drawImage(person.image, -person.width / 2, -person.height / 2)
                }

                context.restore();
            }

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

                        var angle = (Math.atan2(y - this.gameBoard.gameModel.cannonLocation.y, x - this.gameBoard.gameModel.cannonLocation.x) * 180 / Math.PI) - 90;
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