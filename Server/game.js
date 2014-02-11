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
