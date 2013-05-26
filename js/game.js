angular.module('game', []);
 
 
function GameCtrl($scope) {
  $scope.gameState = {}

  //defaults

  $scope.gameState.started = false;
  $scope.gameState.ended = false;
  $scope.gameState.settings = {};
  $scope.gameState.settings.min = 100;
  $scope.gameState.settings.max = 200;
  $scope.gameState.settings.attempts = 10;
  $scope.gameState.attempts = 0;
  $scope.gameState.debug = false;

  $scope.startGame = function() {
    $scope.gameState.started = true;

    //calculate score multiplyer
    $scope.gameState.multiplyer = ($scope.gameState.settings.max - $scope.gameState.settings.min) / $scope.gameState.settings.attempts;
    //generate number
    var min = parseInt($scope.gameState.settings.min);
    var max = parseInt($scope.gameState.settings.max);

    //add achievement for idiocy
    if (min > max) {
      ( new Clay.Achievement( { id: 1531 } ) ).award();
    }

    $scope.gameState.number = min + Math.floor(Math.random() * (max - min + 1)); 
    $scope.gameState.guess = Math.floor(min + (max - min) / 2);
  }

  $scope.guess = function() {
    if ($scope.gameState.number == $scope.gameState.guess) {
      $scope.gameState.won = true;
      $scope.gameState.ended = true;
      $scope.gameState.hint = "It was " + $scope.gameState.number;
      $scope.gameState.finalScore = $scope.gameState.multiplyer * ($scope.gameState.settings.attempts - $scope.gameState.attempts)

      //add achievement for first try
      if ($scope.gameState.attempts == 0) {
        ( new Clay.Achievement( { id: 1530 } ) ).award();
      }

      //publish on Clay leaderboard
      var leaderboard = new Clay.Leaderboard( { id: 1508 } );
      leaderboard.post( { score: $scope.gameState.finalScore }, function( response ) {
        leaderboard.show();
      } );

    } else {
      if ($scope.gameState.number < $scope.gameState.guess) {
        $scope.gameState.hint = "Try a little bit lower";
      } else {
        $scope.gameState.hint = "Try a little bit higher";
      }
    }

    $scope.gameState.attempts++;

    if ($scope.gameState.attempts == $scope.gameState.settings.attempts) {
      $scope.gameState.lost = true;
      $scope.gameState.hint = "It was " + $scope.gameState.number;
      $scope.gameState.ended = true;
    }

  }
}
