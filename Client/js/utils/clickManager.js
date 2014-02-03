define(
    'clickManager',
    [],
    function () {
        function ClickManager(gameModel) {
            this.clickRects = [];
            this.element = undefined;
            this.gameModel = gameModel;
        }

        ClickManager.prototype.pushClickRect = function (clickRect) {
            this.clickRects.push(clickRect);
        };

        ClickManager.prototype.init = function () {
            this.element = document.createElement('div');
            this.element.className = 'clickManager';
            this.element.style.width = this.gameModel.boardWidth + 'px';
            this.element.style.height = this.gameModel.boardHeight + 'px';
            this.element.onmousedown = (function (evt) {
                this.processMouseEvent('mouseDown', evt)
            }).bind(this);

            this.element.onmouseup = (function (evt) {
                this.processMouseEvent('mouseUp', evt)
            }).bind(this);
        };

        ClickManager.prototype.processMouseEvent = function (eventType, evt) {
            var x = evt.offsetX;
            var y = evt.offsetY;
            if (eventType == 'mouseUp') {
                for (var i = 0; i < this.clickRects.length; i++) {
                    var clickRect = this.clickRects[i];
                    clickRect.eventToTrigger.call(clickRect.instance, eventType, clickRect, clickRect.x - x, clickRect.y - y, clickRect.collides(x, y));
                }
            } else {
                for (var i = 0; i < this.clickRects.length; i++) {
                    var clickRect = this.clickRects[i];
                    if (clickRect.collides(x, y)) {
                        clickRect.eventToTrigger.call(clickRect.instance, eventType, clickRect, clickRect.x - x, clickRect.y - y);
                    }
                }
            }
        };

        return ClickManager;
    });






