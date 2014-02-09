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
            this.ticking = 0;
        }


        Chute.prototype.init = function () {

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

        Chute.prototype.render = function (context) {
            this.ticking++;
            var chuteLocation = this.chuteLocation;


            var lit;
            if (this.triggered) {
                lit = !((this.ticking % 10) <4);
            } else {
                lit = (this.ticking % 50) < (this.chuteIndex + 1) * 10 && (this.ticking % 50) > (this.chuteIndex) * 10;

                for (var i = 0; i < this.chutePlane.chutes.length; i++) {
                    var chute = this.chutePlane.chutes[i];
                    if (chute.triggered)
                        lit = false;
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


        };

        Chute.prototype.tick = function () {

        };


        return Chute;
    });