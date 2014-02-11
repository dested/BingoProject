define([], function () {
    function Peg(gameBoard, gameModel, x, y) {
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

    Peg.prototype.init = function () {
        this.body = this.gameBoard.pegPhysicsManager.createPeg(this.x, this.y, this);
    };
    Peg.prototype.trigger = function () {
        if (!this.hit) {
            this.gameModel.interRoundBonus += this.bonus;
            this.hit = true;
            this.ticking = 50;
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