angular.module('game', []);
 
 
function GameCtrl($scope) {
  $scope.gameState = {}

  //defaults

  $scope.gameState.started = false;
  $scope.gameState.settings = {};
  $scope.gameState.settings.min = 100;
  $scope.gameState.settings.max = 200;
  $scope.gameState.settings.attempts = 10;

  $scope.startGame = function() {
    $scope.gameState.started = true;
  }
}
