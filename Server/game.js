require('../Common/ballGame/libs/Box2dWeb-2.1.a.3.min.js');

define(['../Common/ballGame/gameBoard'], function (GameBoard) {


    var io = require('socket.io').listen(9999);
    console.log('game server started');

    var users = [];
    var games = [];


    io.sockets.on('connection', function (socket) {
        console.log('user joined');

        users.push({socket: socket});

        io.sockets.emit('news', {foo: 'bar'});

        socket.on('other', function (from, msg) {
            console.log(msg);
        });

        socket.on('disconnect', function () {
            console.log('user left');
            io.sockets.emit('user disconnected');
        });
    });

    console.log('loaded');


    var boardWidth = 430;
    var boardHeight = 557;


    var gameBoard = new GameBoard(boardWidth, boardHeight);
    gameBoard.init();
    var allDone = false;
    gameBoard.onRoundOver = function () {
        allDone = true;
        debugger;
        console.log('done');
    };
    gameBoard.fireCannon();

    while (!allDone) {
        gameBoard.tick();
    }
    debugger;

});
