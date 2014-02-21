define(
    'common.ballGame.pieces.peg',
    [],
    function () {
        function Peg(gameBoard, x, y, type) {
            this.x = x;
            this.y = y;
            this.type = type;
            this.hit = false;
            this.gameBoard = gameBoard;
            this.body = undefined;
            this.bonus = parseInt(Math.random() * 400);

            this.ticking = undefined;
            this.tocking = 0;
            this.blinking = false;
        }

        Peg.prototype.init = function () {
            this.body = this.gameBoard.pegPhysicsManager.createPeg(this.x, this.y, this);
        };
        Peg.prototype.trigger = function () {
            if (!this.hit) {
                this.gameBoard.gameModel.interRoundBonus += this.bonus;
                this.hit = true;
                this.ticking = 50;
            }
        };
        Peg.prototype.getPegType = function (type) {
            switch (type) {
                case 0:
                    return 'white';
                case 1:
                    return 'blue';
                case 2:
                    return 'yellow';
                case 3:
                    return 'red';
                case 4:
                    return 'green';
                case 5:
                    return 'purple';
            }
        };

        Peg.prototype.destroy = function () {
            this.gameBoard.pegPhysicsManager.destroyBody(this.body);
        };
        Peg.prototype.roundOver = function (finished) {
            if (this.hit) {
                if (finished) {
                    this.destroy();
                } else {
                    this.blinking = true;
                }
            }
        };

        return Peg.extend(Object);
    });