var stats = new Stats();
stats.setMode(0); // 0: fps, 1: ms

stats.domElement.style.position = 'absolute';
stats.domElement.style.right = '0px';
stats.domElement.style.top = '0px';

document.body.appendChild(stats.domElement);


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


var world;

function init() {
    var b2Vec2 = Box2D.Common.Math.b2Vec2
        , b2BodyDef = Box2D.Dynamics.b2BodyDef
        , b2Body = Box2D.Dynamics.b2Body
        , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
        , b2Fixture = Box2D.Dynamics.b2Fixture
        , b2World = Box2D.Dynamics.b2World
        , b2MassData = Box2D.Collision.Shapes.b2MassData
        , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
        , b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
        , b2DebugDraw = Box2D.Dynamics.b2DebugDraw
        ;

    world = new b2World(
        new b2Vec2(0, 10)    //gravity
        , true                 //allow sleep
    );

    var fixDef = new b2FixtureDef;
    fixDef.density = 1;
    fixDef.friction = 1;
    fixDef.restitution = 1;

    var bodyDef = new b2BodyDef;

    //create ground
    bodyDef.type = b2Body.b2_staticBody;
    bodyDef.position.x = 10;
    bodyDef.position.y = 25;
    fixDef.shape = new b2PolygonShape;
    fixDef.shape.SetAsBox(10, .5);
    (body = world.CreateBody(bodyDef)).CreateFixture(fixDef);
    body.SetUserData(100);

    var bodyDef = new b2BodyDef;

    bodyDef.type = b2Body.b2_staticBody;
    bodyDef.position.x = 0;
    bodyDef.position.y = 15;
    fixDef.shape = new b2PolygonShape;
    fixDef.shape.SetAsBox(.5, 15);
    (body = world.CreateBody(bodyDef)).CreateFixture(fixDef);
    body.SetUserData(101);

    var bodyDef = new b2BodyDef;
    bodyDef.type = b2Body.b2_staticBody;
    bodyDef.position.x = 20;
    bodyDef.position.y = 15;
    fixDef.shape = new b2PolygonShape;
    fixDef.shape.SetAsBox(.5, 15);
    (body = world.CreateBody(bodyDef)).CreateFixture(fixDef);
    body.SetUserData(102);

    var fixDef = new b2FixtureDef;
    fixDef.density = 5.0;
    fixDef.friction = 0.5;
    fixDef.restitution = .8;

    var bodyDef = new b2BodyDef;
    //create some objects
    bodyDef.type = b2Body.b2_dynamicBody;
    fixDef.shape = new b2CircleShape(.3);
    bodyDef.position.x = 11;
    bodyDef.position.y = 1;
    (body = world.CreateBody(bodyDef)).CreateFixture(fixDef);
    body.SetUserData(4);


    var bodyDef = new b2BodyDef;
    bodyDef.type = b2Body.b2_staticBody;
    for (var i = 0; i < 60; ++i) {

        fixDef.shape = new b2CircleShape(.6);
        bodyDef.position.x = Math.random() * 18 + 1;
        bodyDef.position.y = Math.random() * 15 + 1+5;

        (body = world.CreateBody(bodyDef)).CreateFixture(fixDef);
        body.SetUserData(3);
    }


    var myListener = new Box2D.Dynamics.b2ContactListener;

    myListener.EndContact = function(fixture) {
        if(fixture.GetFixtureA().GetBody().GetUserData()==4 && fixture.GetFixtureB().GetBody().GetUserData()==3){
            fixture.GetFixtureB().GetBody().SetUserData(5)
        }
    }

    world.SetContactListener(myListener);

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
                x: 160 + cannon.width / 2,
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

    init()
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
function metersToPixel(meter) {

    return meter * 21.5;
}

function drawBalls(context) {
    context.save();


    var body;
    for (body = world.GetBodyList(); body; body = body.GetNext()) {
        var position = body.GetPosition();
        if (body.GetUserData() != 3 && body.GetUserData() != 5)continue;
        var x = metersToPixel(position.x);
        var y = metersToPixel(position.y);
        context.save();
        context.translate(x, y);
        var ballImage;
        if (body.GetUserData()==5) {
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

    var body;
    for (body = world.GetBodyList(); body; body = body.GetNext()) {
        var position = body.GetPosition();
        if (body.GetUserData() != 4)continue;
        var x = metersToPixel(position.x);
        var y = metersToPixel(position.y);
        context.save();
        context.translate(x, y);


        context.translate(-cannonBall.width / 2, -cannonBall.height / 2);
        context.drawImage(cannonBall, 0, 0);


        context.restore();

    }


    context.restore();
}


function render() {
    context.clearRect(0, 0, boardWidth, boardHeight);
    drawBackground(context);
    drawBalls(context);

    drawCannonBall(context);
    drawCannon(context);
/*

    var body;
    for (body = world.GetBodyList(); body; body = body.GetNext()) {
        var position = body.GetPosition();
        if (body.GetUserData() < 100)continue;

        var f = body.GetFixtureList().GetAABB();

        context.save();
        switch(body.GetUserData()){
            case 100:
                context.fillStyle = 'green';
                break;
            case 101:
                context.fillStyle = 'red';
                break;
            case 102:
                context.fillStyle = 'blue';
                break;
        }
        context.fillRect(metersToPixel(f.lowerBound.x), metersToPixel(f.lowerBound.y),
                         metersToPixel(f.upperBound.x-f.lowerBound.x), metersToPixel(f.upperBound.y-f.lowerBound.y));
        context.restore();

    }*/


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


    }


    stats.begin();

    world.Step(
        1 / 60   //frame-rate
        , 10       //velocity iterations
        , 10       //position iterations
    );


    world.ClearForces();
    stats.end();
}


setInterval(function () {
    tick();
    render();
}, 1000 / 60);

start();




