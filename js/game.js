angular.module('game', []);
 
 
function GameCtrl($scope) {
  $scope.gameState = {}

  //defaults

  $scope.gameState.started = false;
  $scope.gameState.settings = {};
  $scope.gameState.settings.min = 100;
  $scope.gameState.settings.max = 200;
  $scope.gameState.settings.attempts = 10;
  $scope.gameState.attempts = 0;

  $scope.startGame = function() {
    $scope.gameState.started = true;

    //calculate score multiplyer
    $scope.gameState.multiplyer = ($scope.gameState.settings.max - $scope.gameState.settings.min) / $scope.gameState.settings.attempts;
    //generate number
    var min = parseInt($scope.gameState.settings.min);
    var max = parseInt($scope.gameState.settings.max);
    $scope.gameState.number = min + Math.floor(Math.random() * (max - min + 1)); 
  }
}
