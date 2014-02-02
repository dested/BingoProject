var canvas;
var context;

var boardWidth = 438;
var boardHeight = 548;

function start() {
    canvas = document.createElement('canvas');
    canvas.width = boardWidth;
    canvas.height = boardHeight;
    context = canvas.getContext("2d");
    document.body.appendChild(canvas);
}

function render() {
    context.clearRect(0, 0, boardWidth, boardHeight);
    context.fillStyle='red';
    context.strokeStyle='black';
    context.lineWidth=4;
    context.fillRect(100,100,100,100);
    context.strokeRect(100,100,100,100);
}


setInterval(function () {
    render();
}, 1000 / 30);

start();
