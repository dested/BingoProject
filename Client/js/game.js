var game = angular.module('Game', []);
game.controller('BingoGameCtrl', function ($scope) {
    var socket = io.connect('http://localhost:9999');
    socket.on('news', function (data) {
        console.log(data);
        socket.emit('other', { shoes:true });
    });

});
