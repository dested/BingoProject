define([        'canvasUtils'], function (canvasUtils) {
    var b2Vec2 = Box2D.Common.Math.b2Vec2,
        b2BodyDef = Box2D.Dynamics.b2BodyDef,
        b2Body = Box2D.Dynamics.b2Body,
        b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
        b2Fixture = Box2D.Dynamics.b2Fixture,
        b2World = Box2D.Dynamics.b2World,
        b2MassData = Box2D.Collision.Shapes.b2MassData,
        b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
        b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
        b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
        b2ContactListener = Box2D.Dynamics.b2ContactListener;

    function PegPhysicsManager(gameModel, shouldDraw) {
        this.world = undefined;
        this.gameModel = gameModel;
        this.shouldDraw = shouldDraw;
    }


    PegPhysicsManager.prototype.init = function () {
        this.world = new b2World(new b2Vec2(0, 35), true);

        this.plane = canvasUtils.createCanvas(this.gameModel.boardWidth, this.gameModel.boardHeight);


        this.createRectangleWall(0, -this.gameModel.boardHeight, 1, this.gameModel.boardHeight * 2);
        this.createRectangleWall(this.gameModel.boardWidth, -this.gameModel.boardHeight, 1, this.gameModel.boardHeight * 2);

        this.createRectangleWall(0, this.gameModel.boardHeight, this.gameModel.boardWidth, 1);

        if (this.shouldDraw) {
            var debugDraw = new b2DebugDraw();
            debugDraw.SetSprite(this.plane.context);
            debugDraw.SetDrawScale(this.getMeterPixelSize());
            debugDraw.SetFillAlpha(0.4);
            debugDraw.SetLineThickness(4.0);
            debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
            this.world.SetDebugDraw(debugDraw);
        }


        var myListener = new b2ContactListener;

        myListener.EndContact = function (fixture) {

            if (fixture.GetFixtureA().GetBody().GetUserData()) {
                if (fixture.GetFixtureA().GetBody().GetUserData().collide) {
                    fixture.GetFixtureA().GetBody().GetUserData().collide(fixture.GetFixtureB().GetBody().GetUserData());
                }
            }

            if (fixture.GetFixtureB().GetBody().GetUserData()) {
                if (fixture.GetFixtureB().GetBody().GetUserData().collide) {
                    fixture.GetFixtureB().GetBody().GetUserData().collide(fixture.GetFixtureB().GetBody().GetUserData());
                }
            }

        };

        this.world.SetContactListener(myListener);


    };
    PegPhysicsManager.prototype.tick = function () {

        this.world.Step(1 / 60, 10, 10);

        this.world.ClearForces();
    };

    PegPhysicsManager.prototype.render = function () {
        if (this.shouldDraw) {
            this.world.DrawDebugData();
        }

    };


    PegPhysicsManager.prototype.createRectangleWall = function (x, y, width, height) {
        var fixDef = new b2FixtureDef;
        fixDef.density = 1;
        fixDef.friction = 1;
        fixDef.restitution = 1;

        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.x = this.pixelToMeter(x) + this.pixelToMeter(width) / 2;
        bodyDef.position.y = this.pixelToMeter(y) + this.pixelToMeter(height) / 2;
        fixDef.shape = new b2PolygonShape;
        fixDef.shape.SetAsBox(this.pixelToMeter(width) / 2, this.pixelToMeter(height) / 2);
        var body = this.world.CreateBody(bodyDef);
        body.CreateFixture(fixDef);
        body.SetUserData('wall');
        return body;
    };
    PegPhysicsManager.prototype.createCircleWall = function (x, y, rad) {

        var fixDef = new b2FixtureDef;
        fixDef.density = 1;
        fixDef.friction = 1;
        fixDef.restitution = 1;

        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;

        fixDef.shape = new b2CircleShape(this.getMeterPixelSize(rad) / 2);
        bodyDef.position.x = this.pixelToMeter(x);
        bodyDef.position.y = this.pixelToMeter(y);
        var body = this.world.CreateBody(bodyDef);
        body.CreateFixture(fixDef);
        body.SetUserData('wall');
        return body;
    };

    PegPhysicsManager.prototype.createPeg = function (x, y, peg) {

        var fixDef = new b2FixtureDef;
        fixDef.density = 1;
        fixDef.friction = 1;
        fixDef.restitution = 1;

        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;

        fixDef.shape = new b2CircleShape(1 / 2);
        bodyDef.position.x = this.pixelToMeter(x);
        bodyDef.position.y = this.pixelToMeter(y);
        var body = this.world.CreateBody(bodyDef);
        body.CreateFixture(fixDef);
        body.SetUserData(peg);
        return body;
    };


    PegPhysicsManager.prototype.createCannonBall = function (x, y, angle, velocity, cannonBall) {


        var vx = Math.cos((angle ) * Math.PI / 180) * velocity;
        var vy = Math.sin((angle ) * Math.PI / 180) * velocity;


        var fixDef = new b2FixtureDef;
        fixDef.density = 1;
        fixDef.friction = 1;
        fixDef.restitution = 1;

        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_dynamicBody;

        fixDef.shape = new b2CircleShape(1.25 / 2);
        bodyDef.position.x = this.pixelToMeter(x);
        bodyDef.position.y = this.pixelToMeter(y);
        var body = this.world.CreateBody(bodyDef);
        body.CreateFixture(fixDef);
        body.SetUserData(cannonBall);


        body.ApplyImpulse(new b2Vec2(vx, vy), body.GetWorldCenter());


        return body;
    };

    PegPhysicsManager.prototype.meterToPixel = function (meter) {
        return meter * this.getMeterPixelSize();
    };
    PegPhysicsManager.prototype.pixelToMeter = function (pixel) {
        return pixel / this.getMeterPixelSize();
    };
    PegPhysicsManager.prototype.getMeterPixelSize = function () {
        return 16;
    };
    PegPhysicsManager.prototype.getBoardWidthInMeters = function () {
        return this.gameModel.boardWidth / this.getMeterPixelSize();
    };
    PegPhysicsManager.prototype.getBoardHeightInMeters = function () {
        return this.gameModel.boardHeight / this.getMeterPixelSize();
    };
    return PegPhysicsManager;
});