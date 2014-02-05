
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
var angleWatchers = [];

for (var i = 0; i < 45; i++) {
    ballPieces.push({
            x: parseInt(Math.random() * (boardWidth - 100)) + 50,
            y: parseInt(Math.random() * (boardHeight - 100)) + 50,
            hit: false
        }//todo: to object
    );
}

collisions.push({
    point1: new Vector({x: 0, y: 0}),
    point2: new Vector({x: 0, y: boardHeight}),
    vector: new Vector(180)
});

collisions.push({
    point1: new Vector({x: boardWidth, y: 0}),
    point2: new Vector({x: boardWidth, y: boardHeight}),
    vector: new Vector(0)
});

collisions.push({
    point1: new Vector({x: 0, y: boardHeight }),
    point2: new Vector({x: boardWidth, y: boardHeight}),
    vector: new Vector(270)
});

collisions.push({
    point1: new Vector({x: 0, y: 0}),
    point2: new Vector({x: boardWidth, y: 0}),
    vector: new Vector(90)
});

function loadImage(imgUrl) {
    var image = document.createElement('img');
    image.src = imgUrl;
    return image;
}
var clicking = false;
var clickingEv = undefined;

function start() {
    canvas = document.createElement('canvas');
    canvas.width = boardWidth;
    canvas.height = boardHeight;
    context = canvas.getContext("2d");
    document.body.appendChild(canvas);
    canvas.onmousedown = function (ev) {

        if (ev.y < boardHeight / 2) {
            clicking = true;
            clickingEv = ev;
        }
    };
    canvas.onmouseup = function (ev) {
        clicking = false;
    };
    canvas.onclick = function (ev) {
        if (ev.y > boardHeight / 2) {
            currentCannonBall = {
                x: 160+cannon.width/2,
                y: 0,
                angle: rotate + 90,
                velocity: 15
            };//todo: to object


            return;
        }

    };

    backgroundImage = loadImage('/images/gameBoards/board1.png');
    cannon = loadImage('/images/cannons/shooter.png');
    ball = loadImage('/images/pegs/blue_peg.png');
    ballHit = loadImage('/images/pegs/blue_peg_lit_overlay.png');
    cannonBall = loadImage('/images/cannonBalls/ball_noshine.png');

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

        context.translate(-ballImage.width / 2, -ballImage.height / 2);

        context.drawImage(ballImage, 0, 0);

        context.restore();
    }

    context.restore();
}

function drawCannonBall(context) {
    context.save();


    context.translate(currentCannonBall.x, currentCannonBall.y);


    context.translate(-cannonBall.width / 2, -cannonBall.height / 2);
    context.drawImage(cannonBall, 0, 0);
    /*    context.strokeStyle = 'white';
     context.strokeText('Angle: ' + currentCannonBall.angle, 25, 25);*/


    context.restore();
}
function drawAngleWatcher(angleWatcher, lastAngleWatcher, context) {
    context.save();


    context.translate(angleWatcher.x, angleWatcher.y);


    context.beginPath();
    context.moveTo(0, 0);
    context.translate(-angleWatcher.x, -angleWatcher.y);
    context.translate(lastAngleWatcher.x, lastAngleWatcher.y);
    context.lineTo(0, 0);


    context.lineWidth = 5;
    if (lastAngleWatcher.collide) {
        context.strokeStyle = 'red';

    } else {
        context.strokeStyle = 'blue';

    }

    context.stroke();


    context.restore();
}


function render() {
    context.clearRect(0, 0, boardWidth, boardHeight);
    drawBackground(context);
    drawBalls(context);

    if (currentCannonBall) {

        drawCannonBall(context);


    }
    drawCannon(context);
/*
    for (var i = 1; i < angleWatchers.length; i++) {

        drawAngleWatcher(angleWatchers[i - 1], angleWatchers[i], context);
    }
*/
}

function tick() {


    if (clicking) {


        if (clickingEv.x < boardWidth / 2) {
            rotate += 1;
        }
        if (clickingEv.x > boardWidth / 2) {
            rotate -= 1;
        }

/*
        angleWatchers = [];

        var piece = {
            x: 160,
            y: 0,
            angle: rotate + 90,
            velocity: 5,
            lastCollision: undefined,
            collide: false

        };
        for (var ci = 0; ci < 2000; ci++) {
            var lastPiece = piece;
            var piece = {
                x: lastPiece.x,
                y: lastPiece.y,
                angle: lastPiece.angle,
                velocity: lastPiece.velocity,
                lastCollision: lastPiece.lastCollision,
                collide: lastPiece.collide
            };
            piece.collide = false;

            for (var i = 0; i < collisions.length; i++) {
                var collision = collisions[i];

                if (piece.lastCollision === collision) {
                    continue
                }
                if (circleLineCollision(new Vector(lastPiece), cannonBall.width / 2, collision.point1, collision.point2)) {
                    piece.angle = reflect(new Vector(lastPiece.angle), collision.vector);
                    piece.lastCollision = collision;
                    piece.collide = true;

                }
            }
            piece.x += Math.cos(piece.angle * Math.PI / 180) * piece.velocity;
            piece.y += Math.sin(piece.angle * Math.PI / 180) * piece.velocity;


            angleWatchers.push(piece);


        }*/

    }


    if (currentCannonBall) {


        currentCannonBall.x += Math.cos(currentCannonBall.angle * Math.PI / 180) * currentCannonBall.velocity;
        currentCannonBall.y += Math.sin(currentCannonBall.angle * Math.PI / 180) * currentCannonBall.velocity;

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


        for (var i = 0; i < collisions.length; i++) {
            var collision = collisions[i];
            if (currentCannonBall.lastCollision === collision) {
                continue;
            }
            if (circleLineCollision(new Vector(currentCannonBall), cannonBall.width / 2, collision.point1, collision.point2)) {
                currentCannonBall.angle = reflect(new Vector(currentCannonBall.angle), collision.vector);
                currentCannonBall.lastCollision = collision;
            }
        }
    }
}

function reflect(vector1, vector2) {
    /* var n=new Vector(vector2);

     //    Vnew = -2*(V dot N)*N + V

     //    return vector +dot * normal;

     var dot = -2*vector1.dot(n);


     n.mul(dot);
     n.add(vector1);
     return n.angle();*/

    /*
     var dot = vector2.dot(vector1);

     var x = vector1.x-((2 * dot) * vector2.x) ;
     var y = vector1.y-((2 * dot) * vector2.y) ;

     var reflection = new Vector({x: x, y: y})
     return reflection.angle();
     */


//    u = (v · n / n · n) n
//    w = v − u
//    v′ = w − u

    /*
     var v = vector1;
     var n = vector2;

     var vdotn = v.dot(n);
     var ndotn = n.dot(n);

     var divdots = vdotn / ndotn;
     var u = {x: divdots * n.x, y: divdots * n.y};

     var w = {x: v.x- u.x, y: v.y- u.y};

     var newAngle=new Vector({x: w.x- u.x, y: w.y- u.y}).angle();

     return  newAngle;*/

    var incoming = vector1.angle();
    var normal = vector2.angle();
    var outgoing = 2 * normal - 180 - incoming;
    return outgoing;

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


function circleLineCollision(C, r, lineVector1, lineVector2) {
    var A = lineVector1;
    var B = lineVector2;
    var P;
    var AC = new Vector(C);
    AC.sub(A);
    var AB = new Vector(B);
    AB.sub(A);
    var ab2 = AB.dot(AB);
    var acab = AC.dot(AB);
    var t = acab / ab2;

    if (t < 0.0)
        t = 0.0;
    else if (t > 1.0)
        t = 1.0;

    //P = A + t * AB;
    P = new Vector(AB);
    P.mul(t);
    P.add(A);

    var H = new Vector(P);
    H.sub(C);
    var h2 = H.dot(H);
    var r2 = r * r;

    if (h2 > r2)
        return false;
    else
        return P;
}



