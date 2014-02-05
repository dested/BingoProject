define(['../libs/stats.min'],function(){
    var stats = new Stats();
    stats.setMode(0); // 0: fps, 1: ms

    stats.domElement.style.position = 'absolute';
    stats.domElement.style.right = '0px';
    stats.domElement.style.top = '0px';

    document.body.appendChild( stats.domElement );

    setInterval( function () {
        stats.begin();
        stats.end();
    }, 1000 / 60 );
})