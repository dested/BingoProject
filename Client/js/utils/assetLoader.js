define(
    'assetLoader',
    [],
    function () {
        function AssetLoader() {
            this.assets = {};
        }

        AssetLoader.prototype.pushAsset = function (name, location, overrideCenter) {
            this.assets[name] = new Asset(location, overrideCenter);
        };
        AssetLoader.prototype.getAsset = function (name) {
            return this.assets[name];
        };

        AssetLoader.prototype.loadAssets = function (completed) {
            var assets = this.assets;
            var keys = Object.keys(assets);
            var loadedIndex = 0;
            var done = function () {
                if (loadedIndex == keys.length) {
                    completed();
                    return;
                }
                loadImage(assets[keys[loadedIndex]], function () {
                    loadedIndex++;
                    done();
                });
            };

            done();
        };


        function Asset(location, overrideCenter) {
            this.location = location;//url
            this.loaded = false;//has it loaded
            this.image = undefined;//html image
            this.width = NaN;
            this.height = NaN;
            this.center = overrideCenter;
        }


        function loadImage(asset, done) {
            var image = document.createElement('img');
            image.src = asset.location;
            image.onload = function () {
                asset.image = image;
                asset.width = image.width;
                asset.height = image.height;
                if (!asset.center) {
                    asset.center = {x: asset.width / 2, y: asset.height / 2};
                }
                done();
            };
            return image;
        }

        return new AssetLoader();
    });




