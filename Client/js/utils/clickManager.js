define(
    'clickManager',
    [],
    function () {
        function ClickManager() {
            this.clickRects = [];
            this.element = undefined;
        }

        ClickManager.prototype.pushClickRect = function (clickRect) {
            this.clickRects.push(clickRect);
        };
        ClickManager.prototype.init = function () {
            this.element = document.createElement('div');
            this.element.className = 'clickManager';
            document.getElementById
            clickManager
        };
        ClickManager.prototype.processMouseDown = function (ev) {

        };

        return new ClickManager();
    });






