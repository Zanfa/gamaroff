angular.module('Colors.controllers')
  .controller('MobileController', ['$scope', 'Messages', 'colors', function ($scope, Messages, colors) {
    $scope.colors = colors;
    $scope.player = null;

    $scope.choose = function (index) {
      $scope.player.color = index;
      $scope.$apply();
      Messages.publish({type: 'Update', player: $scope.player});
    };

    $scope.ready = function () {
      $scope.player.ready = true;
      Messages.publish({type: 'Ready', player: $scope.player});
    };

    $scope.login = function () {
      FB.login(function () {
        FB.api('/me', function (me) {
          $scope.player = {
            id: me.id,
            name: me.first_name,
            color: 2,
            ready: false
          };

          Messages.publish({type: 'Join', player: $scope.player});
          $scope.$apply();
        });
      });
    };
  }]);

