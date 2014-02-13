var game = angular.module('Game', []);
game.controller('BingoGameCtrl', function ($scope) {
    var socket = io.connect('http://acg.io:9999');
    $scope.model={};
    $scope.model.users = [];
    $scope.model.games = [];
    $scope.model.me = undefined;
    $scope.model.userName = 'herschel';
    $scope.model.gameName = '';
    $scope.model.selectedGame = undefined;
    $scope.model.currentGame = undefined;

    socket.on('user.joined', function (payload) {
        $scope.model.me = payload.user;
        $scope.$apply();
    });

    socket.on('users.update', function (payload) {
        $scope.model.users = payload.users;
        $scope.$apply();
    });
    socket.on('games.update', function (payload) {
        $scope.model.games = payload.games;
        $scope.$apply();
    });

    socket.on('game.update', function (payload) {
        $scope.model.currentGame = payload.game;
        if(payload.thrownUser){
            window.gameBoard.gameModel.currentPlayer = payload.thrownUser.guid == $scope.model.me.guid;
        }else{
            window.gameBoard.gameModel.currentPlayer=undefined;
        }
        $scope.$apply();
    });

    socket.on('game.thrownBall', function (payload) {

        $scope.model.currentGame = payload.game;

        if (payload.thrownUser.guid != $scope.model.me.guid) {

            window.gameBoard.cannonPlane.cannon.rotateCannon(payload.cannon.cannonAngle);
            window.gameBoard.fireCannon();
            $scope.model.currentGame = payload.game;
            window.gameBoard.gameModel.currentPlayer = payload.thrownUser.guid == $scope.model.me.guid;

        }
        $scope.$apply();
    });

    $scope.model.setName = function () {
        socket.emit('user.setName', {name: $scope.model.userName});
    };
    $scope.model.getGames = function () {
        socket.emit('games.get');
    };
    $scope.model.createGame = function () {
        socket.emit('games.create', {name: $scope.model.gameName});
    };
    $scope.model.joinGame = function (game) {
        $scope.model.selectedGame = game;
        socket.emit('games.join', {guid: $scope.model.selectedGame.guid});
    };
    $scope.model.startGame = function () {
        if ($scope.model.currentGame && $scope.model.me && $scope.model.currentGame.leader.guid == $scope.model.me.guid) {
            socket.emit('game.start', {guid: $scope.model.currentGame.guid});
        }
    };
    $scope.model.leaveGame = function () {
        if ($scope.model.currentGame && $scope.model.me) {
            socket.emit('game.leave', {guid: $scope.model.currentGame.guid});
        }
    };

    $scope.model.throwBall = function () {
        if ($scope.model.currentGame && $scope.model.me && $scope.model.currentGame.throwingUser.guid == $scope.model.me.guid) {
            //cannon.fire
            window.gameBoard.fireCannon();
            socket.emit('game.throwBall', {guid: $scope.model.currentGame.guid, cannon: {cannonAngle: window.gameBoard.gameModel.cannonAngle}});
        }
    };


});


/*


 users
 emit

 on
 -  users.update


 games
 emit
 -  games.get
 -  games.create
 -  games.join
 on
 -  games.update


 user
 emit
 -  user.setName
 on


 game
 emit
 -  game.start
 -  game.throwBall
 -  game.leave
 on
 -  game.thrownBall

 */
 