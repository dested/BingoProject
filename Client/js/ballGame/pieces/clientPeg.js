define(
    [
        'assetLoader',
        'common.ballGame/pieces/peg'
    ],
    function (assetLoader,Peg) {
        function ClientPeg(gameBoard, gameModel, x, y) {
            this.x = x;
            this.y = y;
            this.hit = false;
            this.gameBoard = gameBoard;
            this.gameModel = gameModel;
            this.body = undefined;
            this.bonus = parseInt(Math.random() * 400);

            this.ticking = undefined;
            this.tocking = 0;
            this.blinking = false;
        }

        ClientPeg.prototype.render = function (context) {
            this.tocking++;
            context.save();
            context.translate(this.x, this.y);
            var image;
            if (this.blinking) {
                if ((this.tocking % 20 < 10)) {
                    image = assetLoader.getAsset('pegHit');
                } else {
                    image = assetLoader.getAsset('peg');
                }
            } else {
                if (this.hit) {
                    image = assetLoader.getAsset('pegHit');
                }
                else {
                    image = assetLoader.getAsset('peg');
                }
            }
            context.translate(-image.center.x, -image.center.y);
            context.drawImage(image.image, 0, 0);
            context.restore();
        };


        ClientPeg.prototype.renderText = function (context) {
            if (this.ticking) {

                this.ticking--;
                var posY = parseInt(this.ticking / 4);


                context.save();
                context.translate(this.x, this.y);


                context.translate(0, -25 + posY);


                var fontSize = 17;
                context.fillStyle = 'white';
                context.font = 'bold ' + fontSize + 'px Arial';


                context.shadowColor = '#72C9FC';
                context.shadowOffsetX = 0;
                context.shadowOffsetY = 0;
                context.shadowBlur = 5;

                var bonusText = "+$" + this.bonus.toString();
                var size = context.measureText(bonusText);
                context.fillText(bonusText, -size.width / 2, -fontSize / 2);


                context.restore();

                if (this.ticking == 0)
                    this.ticking = undefined;


            }
        };


        return ClientPeg.extend(Peg);
    });