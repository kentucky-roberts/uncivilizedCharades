
angular
  .module('app.controllers', [])



.controller('CardListController', ['$scope', 'CardType',
  function($scope, CardType) {
    $scope.cards = CardType.findRange();
    $scope.orderProp = 'phrase';

  }])



.controller('CardsCtrl', function($scope, $ionicModal, $ionicPopover, $ionicListDelegate, Cards) {

  $scope.cards = Cards;

  $scope.shouldShowDelete = false;
  $scope.shouldShowReorder = false;
  $scope.listCanSwipe = true


  //$scope.filterFunction = function(element) {
   // return element.name.match(/^Ma/) ? true : false;
  //};

    $scope.filterFunction = function(element) {
    return element.xLevel.match(/^Ma/) ? true : false;
  };

  $scope.addCard = function(phrase, color, xLevel) {
    $scope.err = null;
    $scope.cards.$add({
      name: name,
      color: color,
      xLevel: xLevel
    })
    .then(function(/* user */) {
      $scope.modal.remove();
    }, function(err) {
      $scope.err = errMessage(err);
    });
  };

  $scope.edit = function(item) {
    alert('Edit Item: ' + item.id);
  };

  $ionicModal.fromTemplateUrl('templates/my-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });


  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });


}) //CardsCtrl




// .controller('DeviceController', function($ionicPlatform, $scope, $cordovaDevice) {
//     $ionicPlatform.ready(function() {
//         $scope.$apply(function() {
//             // sometimes binding does not work! :/

//             // getting device infor from $cordovaDevice
//             var device = $cordovaDevice.getDevice();

//             $scope.manufacturer = device.manufacturer;
//             $scope.model = device.model;
//             $scope.platform = device.platform;
//             $scope.uuid = device.uuid;

//         });

//     });
// })

//.controller('UserController', function(GameService {})


.controller('CardsCtrl', function($scope, TDCardDelegate, $ionicModal, $ionicPopover, $ionicListDelegate, CardService) {

  $scope.cards = CardService;

  $scope.shouldShowDelete = false;
  $scope.shouldShowReorder = false;
  $scope.listCanSwipe = true


  //$scope.filterFunction = function(element) {
   // return element.name.match(/^Ma/) ? true : false;
  //};

    $scope.filterFunction = function(element) {
    return element.xLevel.match(/^Ma/) ? true : false;
  };

  $scope.addCard = function(phrase, color, xLevel) {
    $scope.err = null;
    $scope.cards.$add({
      name: name,
      color: color,
      xLevel: xLevel
    })
    .then(function(/* user */) {
      $scope.modal.remove();
    }, function(err) {
      $scope.err = errMessage(err);
    });
  };

  $scope.edit = function(item) {
    alert('Edit Item: ' + item.id);
  };

  $ionicModal.fromTemplateUrl('templates/my-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });


  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });


}) //CardsCtrl


// .controller('CardController', function($scope, TDCardDelegate, $timeout, CardService) {

//   var vm = this;

//   vm.phrase;
//   vm.altPhrase;

//   vm.init = function(){
//       vm.showAltPhrase = false;
//       //vm.displayCard();

//       $scope.$watchCollection('vm.card',function(newC,oldC){
//           vm.displayCard();
//       });
//   };

//   vm.displayCard = function(){
//     console.log("vm.displayCard was just called");

//           //vm.card = CardService.first();

//           vm.phrase = vm.card.phrase;
//           vm.altPhrase = vm.card.altPhrase;
//   };

//   vm.nextCard = function() {
//       CardService.nextCard();
//   };

//   vm.togglePhrases = function() {
//       vm.showAltPhrase === false ? true: false;
//       console.log(vm.showAltPhrase);
//   };

//   vm.showAltPhrase = function() {
//     vm.showAltPhrase = false;
//     console.log(vm.showAltPhrase);
//   };

//   vm.showPhrase = function() {
//     card.showAltPhrase = true;
//     console.log(card.showAltPhrase);
//   };


//   vm.init();
// })


.controller('UnderCtrl', function($scope) {
  $scope.items = [];
  for(var i = 0; i < 30; i++) {
    $scope.items.push({text: 'Item ' + (i+1) });
  }
})
.controller('OverlayCtrl', function($scope) {
  $scope.items = [];
  for(var i = 0; i < 5; i++) {
    $scope.items.push({text: 'Option' + (i+1) });
  }
})


.controller('StoreController', function($scope, ProductService) {
	var store = this;

	store.products = ProductService.all();
	$scope.products = store.products;

})



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
