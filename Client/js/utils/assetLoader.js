define(
    'assetLoader',
    [],
    function () {
        function AssetLoader() {
            this.assets = {};
        }

        AssetLoader.prototype.pushAsset = function (name, location) {
            this.assets[name] = new Asset(location);
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


        function Asset(location) {
            this.location = location;//url
            this.loaded = false;//has it loaded
            this.image = undefined;//html image
            this.width=NaN;
            this.height=NaN;
        }


        function loadImage(asset, done) {
            var image = document.createElement('img');
            image.src = asset.location;
            image.onload = function () {
                asset.image = image;
                asset.width=image.width;
                asset.height=image.height;
                done();
            };
            return image;
        }

        return new AssetLoader();
    });




