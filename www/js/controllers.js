
angular
  .module('app.controllers', [])

// .controller('AppController', [ '$rootScope', '$scope',  '$window', '$interval', '$timeout', '$state', '$ionicTabsDelegate', '$ionicPopup', '$http', '$ionicModal', '$ionicLoading', 'ionicToast', 'ngAudio', 'LoginService', 'UserService', 'PlayerService', 'TeamService', 'GameService', 'CardService,' 'DealerService', 'ModalService', 'CountdownService',  
// 	function($scope, $state, $window, $interval, $timeout, $ionicTabsDelegate, $ionicPopup, $http, $ionicModal, $ionicLoading, ionicToast, ngAudio, LoginService, UserService, PlayerService, TeamService, GameService, CardService, DealerService, ModalService, CountdownService) {
  	
.controller('AppController', ['$scope', '$window', '$interval', '$timeout', '$ionicModal', '$ionicLoading', '$http', '$ionicTabsDelegate', '$ionicPlatform', 'fbutil', '$firebaseObject', 'FBURL', 'ngAudio', 'ionicToast', '$ionicNavBarDelegate', 'PlayerService', 'CardService', 'ModalService', 'CountdownService', 'DealerService', 'LoginService', 'GameService', 'UserService', 'AppService', 'GameService', 'Games', 
  function($scope, $window, $interval, $timeout, $ionicModal, $ionicLoading, $http, $ionicTabsDelegate, $ionicPlatform, fbutil, $firebaseObject, FBURL, ngAudio, ionicToast, $ionicNavBarDelegate, PlayerService, CardService, ModalService, CountdownService, DealerService, LoginService, GameService, UserService, AppService, GameService, Games) {

	$scope.showLoading = function() {
		$ionicLoading.show();
	}; $scope.showLoading(); 

	// $ionicPlatform.ready(function() {
	//     $scope.$apply(function() {
	//         // sometimes binding does not work! :/
	//         // getting device infor from $cordovaDevice
	//         var device = $cordovaDevice.getDevice();
	//         $scope.manufacturer = device.manufacturer;
	//         $scope.model = device.model;
	//         $scope.platform = device.platform;
	//         $scope.uuid = device.uuid;
	//         $scope.boot$scope();
	//     })
	// })

	var app = this;
	$scope.user = [];
	$scope.players = [];
	$scope.teams = [];


	$scope.saveNewGame = function(players) {
		// GameService.saveFirebaseGame();
		console.log("saveNewGame() called!");
	};


	////////////////////////////////////////
	// Game Sound Effects
	////////////////////////////////////////
	$scope.chaChing = ngAudio.load("sound/cha-ching.mp3"); // returns NgAudioObject
	$scope.awww = ngAudio.load("sound/awww.mp3"); // returns NgAudioObject
	$scope.crickets = ngAudio.load("sound/crickets.mp3"); // returns NgAudioObject
	$scope.snowballSplat = ngAudio.load("sound/snowball-splat.mp3"); // returns NgAudioObject
	$scope.squishFart = ngAudio.load("sound/squish-fart.mp3"); // returns NgAudioObject
	$scope.voiceOn = ngAudio.load("sound/voice_on.mp3"); // returns NgAudioObject
	$scope.voiceOff = ngAudio.load("sound/voice_off.mp3"); // returns NgAudioObject
	$scope.clickOn = ngAudio.load("sound/click-on.mp3"); // returns NgAudioObject
	$scope.clickOff = ngAudio.load("sound/click-off.mp3"); // returns NgAudioObject

	$scope.soundChaChing = function() { $scope.chaChing.play(); };
	$scope.soundAwww = function() { $scope.awww.play(); };
	$scope.soundCrickets = function() { $scope.crickets.play(); };
	$scope.soundSnowballSplat = function() { $scope.snowballSplat.play(); };
	$scope.soundSquishFart = function() { $scope.squishFart.play(); };
	$scope.soundVoiceOn = function() { $scope.voiceOn.play(); };
	$scope.soundVoiceOff = function() { $scope.voiceOff.play(); };
	$scope.soundClickOn = function() { $scope.clickOn.play(); };
	$scope.soundClickOff = function() { $scope.clickOff.play(); };

	////////////////////////////////////////
	// Layout Methods
	////////////////////////////////////////
	$scope.hideNavBar = function() {
	    document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
	};
	
	$scope.hideNavBar();

	$scope.showNavBar = function() {
	    document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
	};

	$scope.noHeader = function() {
	    var content = document.getElementsByTagName('ion-content');
	    for (var i = 0; i < content.length; i++) {
	        if (content[i].classList.contains('has-header')) {
	            content[i].classList.toggle('has-header');
	        }
	    }
	};

	////////////////////////////////////////
	// User Authentication
	////////////////////////////////////////
	// $scope.showRegistration = $scope.showRegistration;
	$scope.showLoginUser = function() {
		$ionicTabsDelegate.select(0);
	}

	$scope.showBuildPlayers = function() {
		$ionicTabsDelegate.select(1);
	}

	$scope.showBuildTeams = function() {
		$ionicTabsDelegate.select(2);
	}

	$scope.showMainMenu = function() {
		$ionicTabsDelegate.select(3);  // main-menu-tab

		if ($scope.user.savedGames.length === -1) {
			console.log("This user doesn't have any savedGames.  That means they can only create a new game.")
			$scope.showCreateNewGame();
		} else {
			$scope.showLoadGameOrCreateNewGame();
		}
	}

	$scope.showCreateNewGame = function() {
		$ionicTabsDelegate.select(3);  // create-game-tab // uses $scope.players and $scope.teams in pop-up modal, asking to confirm newGame settings.  If YES then // ng-click="$scope.createNewGame($scope.players, $scope.teams);" // 

	};

	$scope.showLoadGameOrCreateNewGame = function() {
		$ionicTabsDelegate.select(3);  // create-game-tab // uses $scope.players and $scope.teams in pop-up modal, asking to confirm newGame settings.  If YES then // ng-click="$scope.createNewGame($scope.players, $scope.teams);" // 
		$scope.showLoadGameButton = true;
	};


	$scope.bootApp = function() {
		$scope.init()
	};
	$scope.hideLoading = function() {
	    $timeout(function() {
	        $ionicLoading.hide();
	    }, 1000);
	};
	$scope.hideLoading();
}])  //// @endAppController





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
.controller('IntroController', function ($scope, $state, $ionicSlideBoxDelegate) {


  // Called to navigate to the main app
  $scope.startApp = function () {
    $state.go('app.game');
  };
  $scope.next = function () {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function () {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function (index) {
    $scope.slideIndex = index;
  };
})

.controller('CardsController', ['$scope', '$window', '$interval', '$timeout', '$ionicModal', '$ionicLoading', '$http', 'PlayerService', 'CardService', 'ModalService', 'CountdownService', 'DealerService', 
  function($scope, $window, $interval, $timeout, $ionicModal, $ionicLoading, $http, PlayerService, CardService, ModalService, CountdownService, DealerService) {

	  var cardTypes = CardService.all();

	  $scope.oneCard = CardService.oneCard();
	  $scope.threeCards = CardService.threeCards();


	  $scope.cards = {
	    master: cardTypes,
	    active: [],
	    activeCard: [],
	    discards: [],
	  };

	  $scope.playerCards = {};
	  $scope.activeCards = [];

	  $scope.cardsControl = {};

	  $scope.cardDestroyed = function(index) {
	    $scope.cards.master.splice(index, 1);
	  };

	  $scope.deal = function() {
	  	$scope.hideCards = true;
	  	//$scope.refreshCards();
	  	$scope.activeCards = CardService.threeCards();
	  }
$scope.deal();
	  $scope.addCard = function() {
	    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
	    newCard.id = Math.random();
	    $scope.cards.active.push(angular.extend({}, newCard));
	  };

	  $scope.refreshCards = function() {
	    // Set $scope.cards to null so that directive reloads
	    $scope.cards.active = null;
	    $timeout(function() {
	      $scope.cards.active = Array.prototype.slice.call($scope.cards.master, 0);
	    });
	  };


	$scope.cardSwipedUp = function(index) {
	    console.log('UP SWIPE');
	    $scope.activateCard(index);
	    CountdownService.setTrueTag();
	    $("td-card").addClass("hidden");
	};

	$scope.cardSwipedLeft = function(index) {
	    console.log('LEFT SWIPE');
	    //$scope.addCard();
	     $scope.cardDestroyed(index);
	};

	$scope.cardSwipedRight = function(index) {
	    console.log('RIGHT SWIPE');
	    //$scope.addCard();
	    $scope.cardDestroyed(index);
	};

	$scope.activateCard = function(index) {
		//console.log("activeCard index: " + index);
	    $scope.cards.master.splice(index, 1);
	    $scope.cards.activeCard.push(angular.extend({}, index));
	    console.log($scope.cards.activeCard);
	    $("td-card").addClass("hidden");
	    var activeCard = CardService.activeCard(index);
	    console.log(activeCard);
	 };

	$scope.deActivateCard = function(index) {
	    $scope.cards.activeCard.splice(index, 1);
	    $scope.cardDestroyed(index);
	    console.log($scope.cards.activeCard);
	};

	  $scope.$on('removeCard', function(event, element, card) {
	    var discarded = $scope.cards.master.splice($scope.cards.master.indexOf(card), 1);
	    $scope.cards.discards.push(discarded);
	  });


  $scope.showAlt = false;


  // $scope.onDragDown = function(index){
  //   console.log("... you are dragging the card!");
  // };

  // $scope.onTap = function() {
  //   console.log("Tapped!");
  //   $(td-card).addClass("no-shadow");
  // };

  $scope.onDoubleTap = function() {
    console.log("Double-Tapped!");
  };

  // $scope.onHold = function(){
  //   console.log("onHold just happened!");
  //   $(td-card).addClass("without-shadow");
  // };


 //$scope.reload();
}])


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


.controller('CardController', function($scope, TDCardDelegate, $timeout, CardService) {

  var vm = this;

  vm.phrase;
  vm.altPhrase;

  vm.init = function(){
      vm.showAltPhrase = false;
      //vm.displayCard();

      $scope.$watchCollection('vm.card',function(newC,oldC){
          vm.displayCard();
      });
  };

  vm.displayCard = function(){
    console.log("vm.displayCard was just called");

          vm.card = CardService.first();
     
          vm.phrase = vm.card.phrase;
          vm.altPhrase = vm.card.altPhrase;
  };

  vm.nextCard = function() {
      CardService.nextCard();
  };

  vm.togglePhrases = function() {
      vm.showAltPhrase === false ? true: false;
      console.log(vm.showAltPhrase);
  };

  vm.showAltPhrase = function() {
    vm.showAltPhrase = false;
    console.log(vm.showAltPhrase);
  };

  vm.showPhrase = function() {
    card.showAltPhrase = true;
    console.log(card.showAltPhrase);
  };


  vm.init();
})


.controller('CardCtrl', function($scope, TDCardDelegate) {
  $scope.cardSwipedLeft = function(index) {
    console.log('LEFT SWIPE');
    $scope.addCard();
  };
  $scope.cardSwipedRight = function(index) {
    console.log('RIGHT SWIPE');
    $scope.addCard();
  };
})



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

