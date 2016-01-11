angular.module('todo', ['ionic'])

.factory('Games', function() {
  return {
    all: function() {
      var gameString = window.localStorage['games'];
      if(gameString) {
        return angular.fromJson(gameString);
      }
      return [];
    },
    save: function(games) {
      window.localStorage['games'] = angular.toJson(games);
    },
    newGame: function(gameTitle) {
      // Add a new project
      return {
        title: gameTitle,
        players: []
      };
    },
    getLastActiveIndex: function() {
      return parseInt(window.localStorage['lastActiveGame']) || 0;
    },
    setLastActiveIndex: function(index) {
      window.localStorage['lastActiveGame'] = index;
    }
  }
})

.controller('TodoCtrl', function($scope, $timeout, $ionicModal, $ionicSideMenuDelegate, Games) {

  // A utility function for creating a new project
  // with the given projectTitle
  var createGame = function(gameTitle) {
    var newGame = Games.newGame(gameTitle);
    $scope.games.push(newGame);
    Games.save($scope.games);
    $scope.selectGame(newGame, $scope.games.length - 1);
    $scope.gameModal.hide();
  }


  // Load or initialize projects
  $scope.games = Games.all();

  // Grab the last active, or the first project
  $scope.activeGame = $scope.games[Games.getLastActiveIndex()];
    
    $scope.showGameModal = function(){
        $scope.gameModal.show();
    };
    
  // Called to create a new project
  $scope.newGame = function(game) {
    //var projectTitle = prompt('Project name');
    var gameTitle = game.title;
    if(gameTitle) {
      createGame(gameTitle);
    }
  };

  // Called to select the given project
  $scope.selectGame = function(game, index) {
    $scope.activeGame = game;
    Games.setLastActiveIndex(index);
   // $scope.sideMenuController.close();
   $ionicSideMenuDelegate.toggleRight();
  };

  // Create our modal
  $ionicModal.fromTemplateUrl('new-player.html', function(modal) {
    $scope.playerModal = modal;
  }, {
    scope: $scope
  });
  $ionicModal.fromTemplateUrl('new-game.html', function(modal) {
    $scope.gameModal = modal;
  }, {
    scope: $scope
  });

  $scope.createPlayer = function(player) {
    if(!$scope.activeGame || !player) {
      return;
    }
    $scope.activeGame.players.push({
      name: player.name 
    });
    $scope.playerModal.hide();

    // Inefficient, but save all the projects
    Games.save($scope.games);

    player.name = "";
  };





    $scope.newPlayer = function() {
        $scope.playerModal.show();
    };

    $scope.closeNewPlayer = function() {
        $scope.playerModal.hide();
    }
    
    $scope.closeNewGame = function(){
        $scope.gameModal.hide();
    }
    
    $scope.toggleGames = function() {
        //console.log("---------------------------");
        //console.log($scope);
        //$scope.sideMenuController.toggleLeft();
        $ionicSideMenuDelegate.toggleLeft();
    };


  // Try to create the first project, make sure to defer
  // this by using $timeout so everything is initialized
  // properly
  $timeout(function() {
    if($scope.games.length == 0) {
      //while(true) {
        $scope.gameModal.show();
        //var projectTitle = prompt('Your first project title:');
        //if(projectTitle) {
          //createProject(projectTitle);
          //break;
        //}
      //}
    }
  });

});