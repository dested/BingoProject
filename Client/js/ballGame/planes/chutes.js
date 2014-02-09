define(
    [
        'canvasUtils',
        'assetLoader',
        '../pieces/chute'
    ],
    function (canvasUtils, assetLoader, Chute) {

        function ChutesPlane(gameBoard, gameModel) {
            this.backPlane = undefined; //canvas plane
            this.frontPlane = undefined; //canvas plane
            this.gameModel = gameModel;
            this.gameBoard = gameBoard;

            this.bumpersAsset = undefined;
            this.bucketsAsset = undefined;


            this.chutes = [];

        }

        ChutesPlane.prototype.init = function () {
            this.backPlane = canvasUtils.createCanvas(this.gameModel.boardWidth, this.gameModel.boardHeight);
            this.frontPlane = canvasUtils.createCanvas(this.gameModel.boardWidth, this.gameModel.boardHeight);


            this.bumpersAsset = assetLoader.getAsset('chuteBumpers');
            this.bucketsAsset = assetLoader.getAsset('chuteBuckets');


            var chuteLocations = [];

            var roundBumperOffset = 14;
            var bucketWidth = 55;
            var bucketHeight = this.bucketsAsset.height;
            var bumperWidth = 31;
            var halfBumperWidth = 18;


            for (var i = 0; i < 5; i++) {
                var x = halfBumperWidth + i * (bucketWidth + bumperWidth);
                chuteLocations.push({x: x, y: this.gameBoard.gameModel.boardHeight - this.bucketsAsset.height});
            }


            var wallLocations = [];

            wallLocations.push(
                {
                    x: 0,
                    y: this.gameBoard.gameModel.boardHeight - (this.bumpersAsset.height - roundBumperOffset),
                    width: halfBumperWidth,
                    height: this.bumpersAsset.height - roundBumperOffset,
                    circleX: 0
                }
            );

            for (var i = 1; i < 5; i++) {
                var x = halfBumperWidth + (bucketWidth * i) + (bumperWidth * (i - 1));
                wallLocations.push(
                    {
                        x: x,
                        y: this.gameBoard.gameModel.boardHeight - (this.bumpersAsset.height - roundBumperOffset),
                        width: bumperWidth,
                        height: this.bumpersAsset.height - roundBumperOffset,
                        circleX: x + (bumperWidth / 2)

                    }
                );
            }

            wallLocations.push(
                {
                    x: halfBumperWidth + (bucketWidth * 5) + (bumperWidth * (5 - 1)),
                    y: this.gameBoard.gameModel.boardHeight - (this.bumpersAsset.height - roundBumperOffset),
                    width: halfBumperWidth,
                    height: this.bumpersAsset.height - roundBumperOffset,
                    circleX: this.gameBoard.gameModel.boardWidth
                }
            );


            for (var i = 0; i < chuteLocations.length; i++) {
                var chuteLocation = chuteLocations[i];
                var chute = new Chute(this.gameModel,this, i, chuteLocation);
                this.chutes.push(chute);

                this.gameBoard.pegPhysicsManager.createRectangleSensor(chuteLocation.x, chuteLocation.y, bucketWidth, bucketHeight,chute);

            }


            for (var i = 0; i < this.chutes.length; i++) {
                var chute = this.chutes[i];
                chute.init();
            }


            for (var i = 0; i < wallLocations.length; i++) {
                var wallLocation = wallLocations[i];
                this.gameBoard.pegPhysicsManager.createRectangleWall(wallLocation.x, wallLocation.y, wallLocation.width, wallLocation.height,'wall')
                this.gameBoard.pegPhysicsManager.createCircleWall(wallLocation.circleX, wallLocation.y , roundBumperOffset,'wall')
            }


        };
        ChutesPlane.prototype.roundOver = function () {
            for (var i = 0; i < this.chutes.length; i++) {
                var chute = this.chutes[i];
                chute.triggered=false;
            }


        };
        ChutesPlane.prototype.render = function () {
            this.backPlane.clear();
            this.frontPlane.clear();

            var backContext = this.backPlane.context;
            var frontContext = this.frontPlane.context;

            backContext.save();
            backContext.translate(0, this.gameModel.boardHeight - this.bumpersAsset.height);
            backContext.drawImage(this.bumpersAsset.image, 0, 0);
            backContext.restore();


            backContext.save();
            backContext.translate(18, this.gameModel.boardHeight - this.bucketsAsset.height);
            backContext.drawImage(this.bucketsAsset.image, 0, 0);
            backContext.restore();


            for (var i = 0; i < this.chutes.length; i++) {
                var chute = this.chutes[i];
                chute.render(frontContext);
            }

        };

        ChutesPlane.prototype.tick = function () {

//            this.cannon.tick();
        };

        return ChutesPlane;
    }
)
