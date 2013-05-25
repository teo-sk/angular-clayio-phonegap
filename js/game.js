angular.module('game', []);
 
 
function GameCtrl($scope) {
  $scope.gameState = {}

  //defaults

  $scope.gameState.started = false;
  $scope.gameState.settings = {};
  $scope.gameState.settings.min = 0;
  $scope.gameState.settings.max = 200;
  $scope.gameState.settings.attempts = 10;
}
