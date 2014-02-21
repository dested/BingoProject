define(
    'utils.assetLoader',
    [

    ],
    function () {
        function AssetLoader(spritePath) {
            this.assets = {};
            this.spriteAssetLoaded = false;
            this._loadAssets = undefined;
            this.spriteAsset = new Asset(spritePath);
            loadImage(this.spriteAsset, (function () {
                this.spriteAssetLoaded = true;

                if (this._loadAssets) {
                    loadAssets.call(this, ((function () {
                        this._loadAssets();
                        this._loadAssets = null;
                    }).bind(this)))
                }

            }).bind(this));
        }

        AssetLoader.prototype.pushAsset = function (name, location, overrideCenter) {
            this.assets[name] = new Asset(location, overrideCenter);
        };
        AssetLoader.prototype.getAsset = function (name) {
            return this.assets[name];
        };

        AssetLoader.prototype.loadAssets = function (completed) {
            if (this.spriteAssetLoaded) {
                loadAssets.call(this, completed);
            } else {
                this._loadAssets = completed;
            }
        };

        function loadAssets(completed) {
            var assets = this.assets;
            var keys = Object.keys(assets);
            var loadedIndex = 0;
            var done = function () {
                loadedIndex++;
                if (loadedIndex == keys.length) {
                    completed();
                }
            };

            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                findInAssets(this.spriteAsset, assets[key], done)
            }
        }

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

        function findInAssets(spriteSheet, asset, complete) {
            var assets = window.spriteSheetAssets;
            var location = asset.location;
            if (!assets)
                throw new Error("asset json not loaded");
            for (var key in assets) {
                if (assets.hasOwnProperty(key) && assets[key].source_image == location) {
                    return loadAsset(spriteSheet, assets[key], asset, complete);
                }
            }
            throw new Error("asset not found: " + location)
        }

        function loadAsset(spriteSheet, sprite, asset, complete) {
            var canvas = document.createElement('canvas');
            canvas.width = sprite.width;
            canvas.height = sprite.height;
            var context = canvas.getContext('2d');
            context.drawImage(spriteSheet.image, sprite.x, sprite.y, sprite.width, sprite.height, 0, 0, sprite.width, sprite.height);
            ;

            asset.image = canvas;
            asset.width = canvas.width;
            asset.height = canvas.height;

            if (!asset.center) {
                asset.center = {x: asset.width / 2, y: asset.height / 2};
            }

            complete();
        }

        return new AssetLoader('images/sprite.png', 'images/sprite.json');
    });




