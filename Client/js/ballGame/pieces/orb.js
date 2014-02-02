define(['assetLoader'], function (assetLoader) {
    function Orb(x, y) {
        this.x = x;
        this.y = y;
        this.hit = false;
    }

    Orb.prototype.render = function (context) {
        context.save();
        context.translate(this.x, this.y);
        var image;
        if (this.hit) {
            image = assetLoader.getAsset('orbHit').image;
        }
        else {
            image = assetLoader.getAsset('orb').image;
        }
        context.translate(-image.width / 2, -image.height / 2);
        context.drawImage(image,0,0);

        context.restore();

    };
    return Orb;
})