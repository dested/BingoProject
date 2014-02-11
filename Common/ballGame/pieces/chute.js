define(
    [
        'assetLoader'
    ],
    function (assetLoader) {
        function Chute(gameModel, chutePlane, chuteIndex, chuteLocation) {
            this.gameModel = gameModel;
            this.chuteAssets = [];
            this.chuteAssetsLit = [];
            this.chuteIndex = chuteIndex;
            this.chutePlane = chutePlane;
            this.chuteLocation = chuteLocation;
            this.triggered = false;
            this.blinking = false;
            this.ticking = 0;
            this.chuteNumber = parseInt(Math.random() * 30);
        }


        Chute.prototype.init = function () {

        };

        Chute.prototype.initClient = function () {
            this.chuteAssets.push(assetLoader.getAsset('chuteBlueBucket'));
            this.chuteAssets.push(assetLoader.getAsset('chuteGreenBucket'));
            this.chuteAssets.push(assetLoader.getAsset('chuteYellowBucket'));
            this.chuteAssets.push(assetLoader.getAsset('chuteRedBucket'));
            this.chuteAssets.push(assetLoader.getAsset('chutePurpleBucket'));

            this.chuteAssetsLit.push(assetLoader.getAsset('chuteBlueBucketLit'));
            this.chuteAssetsLit.push(assetLoader.getAsset('chuteGreenBucketLit'));
            this.chuteAssetsLit.push(assetLoader.getAsset('chuteYellowBucketLit'));
            this.chuteAssetsLit.push(assetLoader.getAsset('chuteRedBucketLit'));
            this.chuteAssetsLit.push(assetLoader.getAsset('chutePurpleBucketLit'));


        };
        Chute.prototype.roundOver = function (finished) {
            if (finished) {
                this.triggered = false;
                this.blinking = false;
                this.chuteNumber = parseInt(Math.random() * 30);
            } else {
                if (this.triggered) {
                    this.blinking = true;
                }
            }
        };
        Chute.prototype.render = function (context) {
            this.ticking++;
            var chuteLocation = this.chuteLocation;


            var lit;
            if (this.blinking) {
                lit = !((this.ticking % 10) < 4);
            } else {
                lit = (this.ticking % 50) < (this.chuteIndex + 1) * 10 && (this.ticking % 50) > (this.chuteIndex) * 10;

                for (var i = 0; i < this.chutePlane.chutes.length; i++) {
                    var chute = this.chutePlane.chutes[i];
                    if (chute.blinking) {
                        lit = false;
                        break;
                    }
                }
            }


            var chuteImage = (lit ? this.chuteAssetsLit : this.chuteAssets)[this.chuteIndex].image;

            context.save();
            context.translate(chuteLocation.x, chuteLocation.y);
            if (lit) {
                var offX = (this.chuteAssetsLit[this.chuteIndex].width - this.chuteAssets[this.chuteIndex].width) / 2;
                var offY = (this.chuteAssetsLit[this.chuteIndex].width - this.chuteAssets[this.chuteIndex].width) / 2;

                context.translate(-offX, -offY);
            }
            context.drawImage(chuteImage, 0, 0);
            context.restore();


            context.save();
            context.translate(chuteLocation.x, chuteLocation.y);
            context.translate(this.chuteAssets[this.chuteIndex].width / 2, this.chuteAssets[this.chuteIndex].height / 2);


            var fontSize = 25;
            context.fillStyle = 'white';
            context.font = 'bold ' + fontSize + 'px Arial';


            context.shadowColor = '#72C9FC';
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
            context.shadowBlur = 5;

            var bonusText = this.chuteNumber.toString();
            var size = context.measureText(bonusText);
            context.fillText(bonusText, -size.width / 2, 8);

            context.restore();


        };

        Chute.prototype.tick = function () {

        };


        return Chute;
    });