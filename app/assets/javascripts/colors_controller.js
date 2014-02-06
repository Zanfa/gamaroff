angular.module('Colors.controllers')
  .controller('ColorsController', ['$scope', 'Messages', 'colors', '$timeout', function ($scope, Messages, colors, $timeout) {

    var updatePlayer = function (updatedPlayer) {
      for (var i = 0; i < $scope.players.length; i++) {
        var player = $scope.players[i];
        if (player.id === updatedPlayer.id) {
          player.color = updatedPlayer.color;
          player.ready = updatedPlayer.ready;
        }
      }
    };

    var isEverybodyReady  = function () {
      var isReady = true;

      for (var i = 0; i < $scope.players.length; i++) {
        if ($scope.players[i].ready != true) isReady = false;
      }

      return isReady;
    };

    var startSlideshow = function () {

      var nextPlayer = function () {
        $scope.activePlayer = ($scope.activePlayer + 1) % $scope.players.length;
        $timeout(nextPlayer, 4000);
      };

      $scope.slideShowRunning = true;
      $scope.activePlayer = -1;

      nextPlayer();
    };

    Messages.subscribe();
    $scope.$on(Messages.channel, function (event, payload) {
      // Ignore updates sent during the slideshow
      if ($scope.slideShowRunning) return;

      var msg = payload.message;

      // Add a new player to the board
      if (msg.type === 'Join') {
        var exists = false;
        for (var i = 0; i < $scope.players.length; i++) {
          if ($scope.players[i].id === msg.player.id)
            exists = true;
        }

        if (!exists)
          $scope.players.push(msg.player);
        
      // Update a player's row
      } else if (msg.type === 'Update') {
        updatePlayer(msg.player);

      // Start the slideshow when everybody's ready
      } else if (msg.type === 'Ready') {
        updatePlayer(msg.player);
        if (isEverybodyReady()) {
          startSlideshow();
        }
      }

      $scope.$apply();
    });

    $scope.slideShowRunning = false;
    $scope.colors = colors;
    $scope.players = [];
  }]);

