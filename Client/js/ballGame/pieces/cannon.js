define(['assetLoader','clickRect','clickManager'], function (assetLoader,ClickRect,clickManager) {
    function Cannon(gameModel) {
        this.gameModel = gameModel;
        this.cannonAsset = undefined;
        this.cannonLeftAsset = undefined;
        this.cannonRightAsset = undefined;
    }

    Cannon.prototype.init = function () {
        this.cannonAsset = assetLoader.getAsset('cannon');
        this.cannonLeftAsset = assetLoader.getAsset('cannonLeft');
        this.cannonRightAsset = assetLoader.getAsset('cannonRight');

        var cannonLeftButton = this.gameModel.cannonLeftButton;
        var cannonRightButton = this.gameModel.cannonRightButton;

        clickManager.pushClickRect(
            new ClickRect(
                cannonLeftButton.x - this.cannonLeftAsset.image.width,
                cannonLeftButton.y - this.cannonLeftAsset.image.height,
                this.cannonLeftAsset.image.width,
                this.cannonLeftAsset.image.height,
                this
            )
        );

        clickManager.pushClickRect(
            new ClickRect(
                cannonRightButton.x - this.cannonRightAsset.image.width,
                cannonRightButton.y - this.cannonRightAsset.image.height,
                this.cannonRightAsset.image.width,
                this.cannonRightAsset.image.height,
                this
            )
        );


    };

    Cannon.prototype.render = function (context) {
        context.save();
        var cannonLocation = this.gameModel.cannonLocation;

        context.translate(cannonLocation.x, cannonLocation.y);

        var image = this.cannonAsset.image;

        context.rotate(this.gameModel.cannonAngle * Math.PI / 180);
        context.drawImage(image, -image.width / 2, -image.height / 2);

        context.restore();

    };

    Cannon.prototype.mouseDown = function (clickBox, x, y) {

    };
    return Cannon;
})