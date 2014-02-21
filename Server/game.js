require('./libs/Box2dWeb-2.1.a.3.min');


var define = require('./libs/define');


define('server.game', ['common.extender', 'common.ballGame.gameBoard'], function (_extender, GameBoard) {


    var id = 0;

    function Game(name) {
        this.name = name;
        this.users = [];
        this.guid = id++;
        this.leader = undefined;
        this.ballGameBoard = undefined;
        this.userRoundRobin = 0;
        this.throwingUser = undefined;
        this.state = 'lobby';
    }

    Game.prototype.addUser = function (user) {
        this.users.push(user);
    };
    Game.prototype.setLeader = function (user) {
        this.users.push(user);
        this.leader = user;
    };
    Game.prototype.removeUser = function (user) {
        this.users.splice(this.users.indexOf(user), 1);
        return this.users == 0;
    };

    Game.prototype.getTransmission = function () {
        var payload = {   };
        payload.guid = this.guid;
        payload.name = this.name;
        payload.users = transmit(this.users);
        payload.state = this.state;
        payload.leader = this.leader.getTransmission();
        if (this.isActive()) {
            payload.throwingUser = this.throwingUser.getTransmission();
        }
        return payload;
    };
    Game.prototype.isValid = function () {
        return true;
    };
    Game.prototype.isActive = function () {
        return !!this.ballGameBoard;
    };

    Game.prototype.containsUser = function (user) {
        return this.users.indexOf(user) > -1;
    };

    Game.prototype.nextTurn = function () {
        this.throwingUser = this.users[this.userRoundRobin];
        this.userRoundRobin = (this.userRoundRobin + 1) % this.users.length;

    };
    Game.prototype.start = function () {
        var boardWidth = 430;
        var boardHeight = 557;


        this.ballGameBoard = new GameBoard(boardWidth, boardHeight * 2);
        this.ballGameBoard.init();


        this.nextTurn();

        this.state = 'started';

    };
    Game.prototype.throwBall = function (user, cannon, onDone) {
        if (this.isActive()) {
            if (this.throwingUser === user) {
                this.ballGameBoard.cannonPlane.cannon.rotateCannon(cannon.cannonAngle);
                this.ballGameBoard.fireCannon();

                var allDone = false;
                this.ballGameBoard.onRoundOver = (function () {
                    allDone = true;
                    console.log('done ball game');
                    this.nextTurn();
                    onDone(cannon);
                }).bind(this);

                while (!allDone) {
                    this.ballGameBoard.tick();
                }

            }
        }
    };
    Game.prototype.end = function () {
        if (this.isActive()) {
            this.state = 'over';

        }
    };
    Game.prototype.emit = function (message, payload) {
        for (var i = 0; i < this.users.length; i++) {
            var user = this.users[i];
            user.emit(message, payload);
        }
    };


    function User(socket) {
        this.socket = socket;
        this.name = undefined;
        this.guid = id++;
    }

    User.prototype.setName = function (name) {
        this.name = name;
    };

    User.prototype.isValid = function () {
        return !!this.name;
    };
    User.prototype.getTransmission = function () {
        var payload = {};
        payload.name = this.name;
        payload.guid = this.guid;
        return payload;

    };
    User.prototype.emit = function (message, payload) {
        this.socket.emit(message, payload);
    };


    var io = require('socket.io').listen(9999);
    console.log('game server started');

    var users = [];
    var games = [];

    function updateUsers() {
        io.sockets.emit('users.update',
            {
                users: transmit(users)
            }
        );
    }

    function updateGames() {
        io.sockets.emit('games.update',
            {
                games: transmit(games)
            }
        );
    }

    function transmit(items) {
        var col = [];
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item.isValid()) {
                col.push(item.getTransmission());
            }
        }
        return col;
    }

    io.sockets.on('connection', function (socket) {
        console.log('user joined');
        var user = new User(socket);
        users.push(user);

        socket.on('user.setName', function (payload) {
            user.setName(payload.name);
            user.emit('user.joined', {user: user.getTransmission()});
            updateUsers();

            user.emit('games.update',
                {
                    games: transmit(games)
                }
            );
        });

        socket.on('games.get', function () {
            user.emit('games.update', transmit(games));
        });
        socket.on('games.create', function (payload) {
            if (user.isValid()) {
                var game = new Game(payload.name);
                game.setLeader(user);
                games.push(game);
                updateGames();
                game.emit('game.update', {game: game.getTransmission()});

            }
        });

        socket.on('games.join', function (payload) {
            if (user.isValid()) {
                var game = games.filter(function (g) {
                    return g.guid == payload.guid
                })[0];
                if (game) {
                    game.addUser(user);
                    updateGames();
                    game.emit('game.update', {game: game.getTransmission()});
                }
            }
        });

        socket.on('game.start', function (payload) {
            if (user.isValid()) {

                var game = games.filter(function (g) {
                    return g.guid == payload.guid
                })[0];

                if (game) {
                    if (game.leader == user) {
                        game.start();
                        updateGames();
                        game.emit('game.update', {game: game.getTransmission()});
                    }
                }
            }
        });

        socket.on('game.throwBall', function (payload) {
            if (user.isValid()) {

                var game = games.filter(function (g) {
                    return g.guid == payload.guid
                })[0];

                if (game) {
                    game.throwBall(user, payload.cannon, function (done) {
                        if (done) {
                            game.emit('game.thrownBall', {
                                cannon: payload.cannon,
                                thrownUser: user.getTransmission(),
                                game: game.getTransmission()
                            });
                        }
                    });
                }
            }
        });

        socket.on('game.leave', function (payload) {
            if (user.isValid()) {

                var game = games.filter(function (g) {
                    return g.guid == payload.guid
                })[0];

                if (game) {
                    if (game.removeUser(user)) {
                        games.splice(games.indexOf(game), 1);
                    }
                    user.emit('game.update', {game: null});
                    updateGames();
                    game.emit('game.update', {game: game.getTransmission()});
                }

            }

        });

        socket.on('disconnect', function () {
            users.splice(users.indexOf(user), 1);
            for (var i = 0; i < games.length; i++) {
                var game = games[i];
                if (game.containsUser(user)) {
                    if (game.removeUser(user)) {
                        game.end();
                        games.splice(games.indexOf(game), 1);
                    }

                    updateGames();
                    game.emit('game.update', {game: game.getTransmission()});
                }
            }
            updateUsers();
            updateGames();
        });
    });

    console.log('loaded');
});