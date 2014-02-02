var canvas;
var context;

var boardWidth = 438;
var boardHeight = 548;//todo: to object


var backgroundImage;
var ball;
var ballHit;
var cannon;
var cannonBall;

var rotate = 0;
var ballPieces = [];
var collisions = [];
var currentCannonBall;

for (var i = 0; i < 15; i++) {
    ballPieces.push({
            x: parseInt(Math.random() * (boardWidth - 100)) + 50,
            y: parseInt(Math.random() * (boardHeight - 100)) + 50,
            hit: false
        }//todo: to object
    );
}

collisions.push({
    point1: new DVec2({x: 0, y: 0}),
    point2: new DVec2({x: 0, y: boardHeight}),
    effectAngle: -90
});

collisions.push({
    point1: new DVec2({x: boardWidth, y: 0}),
    point2: new DVec2({x: boardWidth, y: boardHeight}),
    effectAngle: 90
});

function loadImage(imgUrl) {
    var image = document.createElement('img');
    image.src = imgUrl;
    return image;
}
function start() {
    canvas = document.createElement('canvas');
    canvas.width = boardWidth;
    canvas.height = boardHeight;
    context = canvas.getContext("2d");
    document.body.appendChild(canvas);

    canvas.onclick = function (ev) {
        if (ev.y > boardHeight / 2) {
            currentCannonBall = {
                x: 160,
                y: 0,
                angle: rotate + 90,
                velocity: 10
            };//todo: to object

            return;
        }
        if (ev.x < boardWidth / 2) {
            rotate += 5;
        }
        if (ev.x > boardWidth / 2) {
            rotate -= 5;
        }
    };

    backgroundImage = loadImage('/images/gameBoards/board1.png');
    cannon = loadImage('/images/cannons/cannon1.png');
    ball = loadImage('/images/balls/ball1.png');
    ballHit = loadImage('/images/balls/ball1Hit.png');
    cannonBall = loadImage('/images/cannonBalls/cannonBall1.png');

}

function drawBackground(context) {
    context.save();

    context.drawImage(backgroundImage, 0, 0);

    context.restore();
}
function drawCannon(context) {
    context.save();
    context.translate(160, -cannon.height / 2);
    context.translate(cannon.width / 2, cannon.height / 2);
    context.rotate(rotate * Math.PI / 180);
    context.drawImage(cannon, -cannon.width / 2, -cannon.height / 2);

    context.restore();
}


function drawBalls(context) {
    context.save();

    for (var i = 0; i < ballPieces.length; i++) {
        var ballPiece = ballPieces[i];
        context.save();
        context.translate(ballPiece.x, ballPiece.y);
        var ballImage;
        if (ballPiece.hit) {
            ballImage = ballHit;
        }
        else {
            ballImage = ball;
        }

        context.translate(ballImage.width / 2, ballImage.height / 2);

        context.drawImage(ballImage, -ballImage.width / 2, -ballImage.height / 2);

        context.restore();
    }

    context.restore();
}

function drawCannonBall(context) {
    context.save();


    context.translate(currentCannonBall.x, currentCannonBall.y);


    context.translate(cannonBall.width / 2, cannonBall.height / 2);
    context.drawImage(cannonBall, -cannonBall.width / 2, -cannonBall.height / 2);
    context.strokeStyle='white';
    context.strokeText('Angle: ' + currentCannonBall.angle, 25, 25);
    context.restore();
}


function render() {
    context.clearRect(0, 0, boardWidth, boardHeight);
    drawBackground(context);
    drawCannon(context);
    drawBalls(context);
    if (currentCannonBall) {
        drawCannonBall(context);
    }
}

function tick() {
    if (currentCannonBall) {

        currentCannonBall.x += Math.cos(currentCannonBall.angle * Math.PI / 180) * currentCannonBall.velocity;
        currentCannonBall.y += Math.sin(currentCannonBall.angle * Math.PI / 180) * currentCannonBall.velocity;
        /*if (currentCannonBall.x < 0 || currentCannonBall.y < 0 || currentCannonBall.x > boardWidth || currentCannonBall.y > boardHeight) {
         currentCannonBall = undefined;
         }*/

        var cannonBallBox = {x: currentCannonBall.x - cannonBall.width / 2, y: currentCannonBall.y - cannonBall.height / 2, width: cannonBall.width, height: cannonBall.height};

        for (var i = 0; i < ballPieces.length; i++) {
            var ballPiece = ballPieces[i];
            if (!ballPiece.hit) {
                var pieceBox = {x: ballPiece.x - ball.width / 2, y: ballPiece.y - ball.height / 2, width: ball.width, height: ball.height};
                if (boxCollides(pieceBox, cannonBallBox)) {
                    ballPiece.hit = true;
                }
            }
        }

        if(currentCannonBall.disableCollisions){
            currentCannonBall.disableCollisions--;
            return;
        }
        for (var i = 0; i < collisions.length; i++) {
            var collision = collisions[i];
            if (circleLineCollision(new DVec2(currentCannonBall), cannonBall.width / 2, collision.point1, collision.point2)) {
                currentCannonBall.angle+=collision.effectAngle;
                currentCannonBall.disableCollisions=5;
            }
        }
    }
}


function boxCollides(box1, box2) {
    return !(
        ((box1.y + box1.height) < (box2.y)) ||
            (box1.y > (box2.y + box2.height)) ||
            ((box1.x + box1.width) < box2.x) ||
            (box1.x > (box2.x + box2.width))
        );
}

setInterval(function () {
    tick();
    render();
}, 1000 / 30);

start();


function circleLineCollision(C, r, linePoint1, linePoint2) {
    var A = linePoint1;
    var B = linePoint2;
    var P;
    var AC = new DVec2(C);
    AC.sub(A);
    var AB = new DVec2(B);
    AB.sub(A);
    var ab2 = AB.dot(AB);
    var acab = AC.dot(AB);
    var t = acab / ab2;

    if (t < 0.0)
        t = 0.0;
    else if (t > 1.0)
        t = 1.0;

    //P = A + t * AB;
    P = new DVec2(AB);
    P.mul(t);
    P.add(A);

    var H = new DVec2(P);
    H.sub(C);
    var h2 = H.dot(H);
    var r2 = r * r;

    if (h2 > r2)
        return false;
    else
        return P;
}



