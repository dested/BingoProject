var io = require('socket.io').listen(999);
console.log('game server started');
io.sockets.on('connection', function (socket) {
    console.log('user joined');

    io.sockets.emit('this', { will: 'be received by everyone'});

    socket.on('private message', function (from, msg) {
        console.log('I received a private message by ', from, ' saying ', msg);
    });

    socket.on('disconnect', function () {
        console.log('user left');
        io.sockets.emit('user disconnected');
    });
});