define(
    'clickRect',
    [],
    function () {
        function ClickRect(x,y,width,height,instance) {
            this.x=x;
            this.y=y;
            this.width=width;
            this.height=height;
            this.instance=instance;
        }

        return ClickRect;
    });






