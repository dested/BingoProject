define(
    'utils.clickRect',
    [

    ],
    function () {
        function ClickRect(x, y, width, height, instance, eventToTrigger) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.instance = instance;
            this.eventToTrigger = eventToTrigger;
        }

        ClickRect.prototype.collides = function (x, y) {
            return this.x < x &&
                this.x + this.width > x &&
                this.y < y &&
                this.y + this.height > y;
        };

        return ClickRect;
    });