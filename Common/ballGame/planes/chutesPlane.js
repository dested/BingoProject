define('common.ballGame.planes.chutesPlane',
    [
        'common.ballGame.pieces.chute'
    ],
    function (Chute) {

        function ChutesPlane(gameBoard) {
            this.backPlane = undefined; //canvas plane
            this.frontPlane = undefined; //canvas plane
            this.gameBoard = gameBoard;

            this.bumpersSize = undefined;
            this.bucketsSize = undefined;


            this.chutes = [];
            this.chuteInstance = Chute;

        }

        ChutesPlane.prototype.init = function () {
            this.bumpersSize = {width: 434, height: 65};
            this.bucketsSize = {width: 399, height: 47};


            var chuteLocations = [];

            var roundBumperOffset = 14;
            var bucketWidth = 55;
            var bucketHeight = this.bucketsSize.height;
            var bumperWidth = 31;
            var halfBumperWidth = 18;


            for (var i = 0; i < 5; i++) {
                var x = halfBumperWidth + i * (bucketWidth + bumperWidth);
                chuteLocations.push({x: x, y: this.gameBoard.gameModel.boardHeight - this.bucketsSize.height});
            }


            var wallLocations = [];

            wallLocations.push(
                {
                    x: 0,
                    y: this.gameBoard.gameModel.boardHeight - (this.bumpersSize.height - roundBumperOffset),
                    width: halfBumperWidth,
                    height: this.bumpersSize.height - roundBumperOffset,
                    circleX: 0
                }
            );

            for (var i = 1; i < 5; i++) {
                var x = halfBumperWidth + (bucketWidth * i) + (bumperWidth * (i - 1));
                wallLocations.push(
                    {
                        x: x,
                        y: this.gameBoard.gameModel.boardHeight - (this.bumpersSize.height - roundBumperOffset),
                        width: bumperWidth,
                        height: this.bumpersSize.height - roundBumperOffset,
                        circleX: x + (bumperWidth / 2)

                    }
                );
            }

            wallLocations.push(
                {
                    x: halfBumperWidth + (bucketWidth * 5) + (bumperWidth * (5 - 1)),
                    y: this.gameBoard.gameModel.boardHeight - (this.bumpersSize.height - roundBumperOffset),
                    width: halfBumperWidth,
                    height: this.bumpersSize.height - roundBumperOffset,
                    circleX: this.gameBoard.gameModel.boardWidth
                }
            );


            for (var i = 0; i < chuteLocations.length; i++) {
                var chuteLocation = chuteLocations[i];
                var chute = new this.chuteInstance(this.gameBoard, this, i, chuteLocation);
                chute.init();
                this.gameBoard.pegPhysicsManager.createRectangleSensor(chuteLocation.x, chuteLocation.y, bucketWidth, bucketHeight, chute);
                this.chutes.push(chute);

            }


            for (var i = 0; i < wallLocations.length; i++) {
                var wallLocation = wallLocations[i];
                this.gameBoard.pegPhysicsManager.createRectangleWall(wallLocation.x, wallLocation.y, wallLocation.width, wallLocation.height, 'wall')
                this.gameBoard.pegPhysicsManager.createCircleWall(wallLocation.circleX, wallLocation.y, roundBumperOffset, 'wall')
            }


        };


        ChutesPlane.prototype.roundOver = function (finished) {
            for (var i = 0; i < this.chutes.length; i++) {
                var chute = this.chutes[i];
                chute.roundOver(finished);
            }
        };

        ChutesPlane.prototype.tick = function () {

//            this.cannon.tick();
        };

        return ChutesPlane.extend(Object);
    }
);
