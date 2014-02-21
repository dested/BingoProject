define(
    'utils.clickManager',
    [

    ],
    function () {
        function ClickManager(gameBoard) {
            this.clickRects = [];
            this.element = undefined;
            this.gameBoard = gameBoard;
        }

        ClickManager.prototype.pushClickRect = function (clickRect) {
            this.clickRects.push(clickRect);
        };

        ClickManager.prototype.init = function () {
            this.element = document.createElement('div');
            this.element.className = 'clickManager';
            this.element.style.width = this.gameBoard.gameModel.canvasWidth + 'px';
            this.element.style.height = this.gameBoard.gameModel.canvasHeight + 'px';
            this.element.onmousedown = (function (evt) {
                this.processMouseEvent('mouseDown', evt)
            }).bind(this);
            this.element.ontouchstart = (function (evt) {
                this.processMouseEvent('mouseDown', evt)
            }).bind(this);

            this.element.onmouseup = (function (evt) {
                this.processMouseEvent('mouseUp', evt)
            }).bind(this);

            this.element.ontouchend = (function (evt) {
                this.processMouseEvent('mouseUp', evt)
            }).bind(this);

            this.element.onmousemove = (function (evt) {
                this.processMouseEvent('mouseMove', evt)
            }).bind(this);

            this.element.ontouchmove = (function (evt) {
                this.processMouseEvent('mouseMove', evt)
            }).bind(this);
        };

        ClickManager.prototype.processMouseEvent = function (eventType, evt) {
            var x , y;

            if (evt.touches) {
                if (evt.touches.length > 0) {
                    x = evt.touches[0].pageX - evt.touches[0].target.offsetLeft;
                    y = evt.touches[0].pageY - evt.touches[0].target.offsetTop;
                } else {
                    x = evt.changedTouches[0].pageX - evt.changedTouches[0].target.offsetLeft;
                    y = evt.changedTouches[0].pageY - evt.changedTouches[0].target.offsetTop;
                }
            } else {
                x = evt.pageX - evt.target.offsetLeft;
                y = evt.pageY - evt.target.offsetTop;
            }
            if (eventType == 'mouseUp') {
                for (var i = 0; i < this.clickRects.length; i++) {
                    var clickRect = this.clickRects[i];
                    clickRect.eventToTrigger.call(clickRect.instance, eventType, clickRect, x - clickRect.x, y - clickRect.y, clickRect.collides(x, y));//ignore result for mouseup

                }
            } else {
                for (var i = 0; i < this.clickRects.length; i++) {
                    var clickRect = this.clickRects[i];
                    if (clickRect.collides(x, y)) {
                        if (clickRect.eventToTrigger.call(clickRect.instance, eventType, clickRect, x - clickRect.x, y - clickRect.y, true)) {
                            break;
                        }
                    }
                }
            }
            evt.preventDefault();
        };

        return ClickManager;
    });






