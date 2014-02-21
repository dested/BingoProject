define(
    'client.ballGame.pegPhysicsManager',
    [
        'utils.canvasUtils',
        'common.ballGame.pegPhysicsManager'
    ],
    function (canvasUtils, PegPhysicsManager) {
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

        function ClientPegPhysicsManager(gameBoard, shouldDraw) {
            this.$super(gameBoard);
            this.shouldDraw = shouldDraw;
        }

        ClientPegPhysicsManager.prototype.init = function () {
            this.$super();
            if (this.shouldDraw) {
                this.plane = canvasUtils.createCanvas(this.gameBoard.gameModel.canvasWidth, this.gameBoard.gameModel.canvasHeight);
                var debugDraw = new b2DebugDraw();
                debugDraw.SetSprite(this.plane.context);
                debugDraw.SetDrawScale(this.getMeterPixelSize());
                debugDraw.SetFillAlpha(0.4);
                debugDraw.SetLineThickness(4.0);
                debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
                this.world.SetDebugDraw(debugDraw);
            }
        };
        ClientPegPhysicsManager.prototype.render = function () {
            if (this.shouldDraw) {
                this.world.DrawDebugData();
            }
        };

        return ClientPegPhysicsManager.extend(PegPhysicsManager);
    });