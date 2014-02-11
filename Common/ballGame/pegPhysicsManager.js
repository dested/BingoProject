define([], function () {
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

    function PegPhysicsManager(gameModel) {
        this.world = undefined;
        this.gameModel = gameModel;
    }


    PegPhysicsManager.prototype.init = function () {
        this.world = new b2World(new b2Vec2(0, 35), true);


        this.createRectangleWall(0, -this.gameModel.boardHeight, 1, this.gameModel.boardHeight * 2, 'wall');
        this.createRectangleWall(this.gameModel.boardWidth, -this.gameModel.boardHeight, 1, this.gameModel.boardHeight * 2, 'wall');
        this.createRectangleWall(0, this.gameModel.boardHeight, this.gameModel.boardWidth, 1, 'wall');


        this.collisions = [];
        var myListener = new b2ContactListener;

        myListener.BeginContact = (function (fixture) {
            if (fixture.GetFixtureA().GetBody().GetUserData()) {
                if (fixture.GetFixtureA().GetBody().GetUserData().collide) {
                    this.collisions.push({objA: fixture.GetFixtureA().GetBody().GetUserData(), objB: fixture.GetFixtureB().GetBody().GetUserData()});
                }
            }

            if (fixture.GetFixtureB().GetBody().GetUserData()) {
                if (fixture.GetFixtureB().GetBody().GetUserData().collide) {
                    this.collisions.push({objA: fixture.GetFixtureB().GetBody().GetUserData(), objB: fixture.GetFixtureA().GetBody().GetUserData()});
                }
            }

        }).bind(this);


        this.world.SetContactListener(myListener);


    };
    PegPhysicsManager.prototype.tick = function () {
        this.collisions = [];

        this.world.Step(1 / 60, 10, 10);
        this.world.ClearForces();

        for (var i = 0; i < this.collisions.length; i++) {
            var collision = this.collisions[i];
            collision.objA.collide(collision.objB);
        }
    };

    PegPhysicsManager.prototype.roundOver = function () {
    };

    PegPhysicsManager.prototype.createRectangleWall = function (x, y, width, height, userData) {
        var fixDef = new b2FixtureDef;
        fixDef.density = 1;
        fixDef.friction = 1;
        fixDef.restitution = .6;

        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.x = this.pixelToMeter(x) + this.pixelToMeter(width) / 2;
        bodyDef.position.y = this.pixelToMeter(y) + this.pixelToMeter(height) / 2;
        fixDef.shape = new b2PolygonShape;
        fixDef.shape.SetAsBox(this.pixelToMeter(width) / 2, this.pixelToMeter(height) / 2);
        var body = this.world.CreateBody(bodyDef);
        body.CreateFixture(fixDef);
        body.SetUserData(userData);
        return body;
    };
    PegPhysicsManager.prototype.createRectangleSensor = function (x, y, width, height, userData) {
        var fixDef = new b2FixtureDef;
        fixDef.density = 1;
        fixDef.friction = 1;
        fixDef.restitution = .6;

        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.x = this.pixelToMeter(x) + this.pixelToMeter(width) / 2;
        bodyDef.position.y = this.pixelToMeter(y) + this.pixelToMeter(height) / 2;
        fixDef.shape = new b2PolygonShape;
        fixDef.shape.SetAsBox(this.pixelToMeter(width) / 2, this.pixelToMeter(height) / 2);
        var body = this.world.CreateBody(bodyDef);
        var fixture = body.CreateFixture(fixDef);
        fixture.SetSensor(true);
        body.SetUserData(userData);
        return body;
    };
    PegPhysicsManager.prototype.createCircleWall = function (x, y, rad, userData) {

        var fixDef = new b2FixtureDef;
        fixDef.density = 1;
        fixDef.friction = 1;
        fixDef.restitution = .6;

        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;

        fixDef.shape = new b2CircleShape(this.pixelToMeter(rad));
        bodyDef.position.x = this.pixelToMeter(x);
        bodyDef.position.y = this.pixelToMeter(y);
        var body = this.world.CreateBody(bodyDef);
        body.CreateFixture(fixDef);
        body.SetUserData(userData);
        return body;
    };

    PegPhysicsManager.prototype.createPeg = function (x, y, peg) {

        var fixDef = new b2FixtureDef;
        fixDef.density = 1;
        fixDef.friction = 1;
        fixDef.restitution = .6;

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

    PegPhysicsManager.prototype.destroyBody = function (body) {
        this.world.DestroyBody(body);
    };
    PegPhysicsManager.prototype.createCannonBall = function (x, y, angle, velocity, cannonBall) {


        var vx = Math.cos((angle) * Math.PI / 180) * velocity;
        var vy = Math.sin((angle) * Math.PI / 180) * velocity;


        var offvx = Math.cos((angle) * Math.PI / 180) * 9 * 16;
        var offvy = Math.sin((angle) * Math.PI / 180) * 3 * 16;

        var fixDef = new b2FixtureDef;
        fixDef.density = 1;
        fixDef.friction = 1;
        fixDef.restitution = .6;

        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_dynamicBody;

        fixDef.shape = new b2CircleShape(1.25 / 2);
        bodyDef.position.x = this.pixelToMeter(x + offvx);
        bodyDef.position.y = this.pixelToMeter(y + offvy);
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
    return PegPhysicsManager.extend(Object);
});