
angular
  .module('app.controllers', [])

// .controller('AppController', [ '$rootScope', '$scope',  '$window', '$interval', '$timeout', '$state', '$ionicTabsDelegate', '$ionicPopup', '$http', '$ionicModal', '$ionicLoading', 'ionicToast', 'ngAudio', 'LoginService', 'UserService', 'PlayerService', 'TeamService', 'GameService', 'CardService,' 'DealerService', 'ModalService', 'CountdownService',  
// 	function($scope, $state, $window, $interval, $timeout, $ionicTabsDelegate, $ionicPopup, $http, $ionicModal, $ionicLoading, ionicToast, ngAudio, LoginService, UserService, PlayerService, TeamService, GameService, CardService, DealerService, ModalService, CountdownService) {
  	
.controller('AppController', ['$scope', '$window', '$interval', '$timeout', '$ionicModal', '$ionicLoading', '$http', '$ionicSwipeCardDelegate', '$ionicTabsDelegate', '$ionicPlatform', 'fbutil', '$firebaseObject', 'FBURL', 'ngAudio', 'ionicToast', 'PlayerService', 'CardService', 'ModalService', 'CountdownService', 'DealerService', 'LoginService', 'GameService', 'UserService', 'AppService', 'GameService', 'Games', 
  function($scope, $window, $interval, $timeout, $ionicModal, $ionicLoading, $http, $ionicSwipeCardDelegate, $ionicTabsDelegate, $ionicPlatform, fbutil, $firebaseObject, FBURL, ngAudio, ionicToast, PlayerService, CardService, ModalService, CountdownService, DealerService, LoginService, GameService, UserService, AppService, GameService, Games) {

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
	//         $scope.bootApp();
	//     })
	// })

	var app = this;
	app.showRegistration = false;
	app.user = [];
	app.players = [];
	app.teams = [];

	app.init = function() {
		app.showRegistration = false;
		app.user = [];
		app.players = [];
		app.teams = [];
		app.readyForUser = true;
		app.readyForPlayers = false;
		app.readyForTeams = false;
		app.showLoadGameButton = false;
		app.showSavedGames = false;
		app.message = "Login or register to start playing!";
		app.start();
	}

	app.start = function() {
		app.demoMakePlayers();
		// if no user, login or create one
		// 

		if (app.user.length === -1 && app.readyForUser === true) {
			app.showLoginUser();
		}

		//app.demoMakePlayers();
	}


	// app.addNewUser = function(userName, password) {
	// 	var newUser = UserService.newUser(userName, password);
	// 	app.user.push(angular.extend({}, newUser));
	// 	$scope.user = angular.copy(app.user);
	// 	console.log(app.user.userName);

	// 	if (app.user.length == 1) {
	// 		app.readyForPlayers = true
	// 		app.showBuildPlayers();
	// 	}
	// };


	app.addNewPlayer = function(playerName) {
		console.log("app.addNewPlayer() was called...");
		$scope.closeModal();
		var newPlayer = PlayerService.newPlayer(playerName);
		console.log(newPlayer);
		
		app.players.push(angular.extend({}, newPlayer));
		$scope.players = angular.copy(app.players);
		$scope.unassignedPlayers = angular.copy(app.players);

		console.log("First app.players from array: " + app.players[0].name);
		console.log("app.players.lenngth: " + app.players.length);


		if (app.players.length >= 4 ) {
			app.readyForTeams = true;
			app.showBuildTeams();
		}


	};


	////////////////////////////////////////
	// ModalService
	////////////////////////////////////////
	  $scope.showNewPlayer = function() {
	    ModalService
	      .init('templates/modals/new-player.html', $scope)
	      .then(function(modal) {
	        modal.show();
	      });
	  };
	  
	  $scope.showLogin = function() {
	    ModalService
	      .init('templates/modals/login-user.html')
	      .then(function(modal) {
	        modal.show();
	      });
	  };


	////////////////////////////////////////
	// Toast
	////////////////////////////////////////
	$scope.showToast = function(){
	<!-- ionicToast.show(message, position, stick, time); -->
	  ionicToast.show('This is a toast at the top.', 'top', true, 2500);
	};

	////////////////////////////////////////
	// User Authentication
	////////////////////////////////////////
	// $scope.showRegistration = app.showRegistration;
	app.showLoginUser = function() {
		$ionicTabsDelegate.select(0);
	}

	app.showBuildPlayers = function() {
		$ionicTabsDelegate.select(1);
	}

	app.showBuildTeams = function() {
		$ionicTabsDelegate.select(2);
	}

	app.showMainMenu = function() {
		$ionicTabsDelegate.select(2);  // main-menu-tab

		if (app.user.savedGames.length === -1) {
			console.log("This user doesn't have any savedGames.  That means they can only create a new game.")
			app.showCreateNewGame();
		} else {
			app.showLoadGameOrCreateNewGame();
		}


	}

	//app.showAvailablePlayers = GameService.showAvailablePlayers();

	app.showCreateNewGame = function() {
		$ionicTabsDelegate.select(2);  // create-game-tab // uses app.players and app.teams in pop-up modal, asking to confirm newGame settings.  If YES then // ng-click="app.createNewGame(app.players, app.teams);" // 

	};

	app.showLoadGameOrCreateNewGame = function() {
		$ionicTabsDelegate.select(2);  // create-game-tab // uses app.players and app.teams in pop-up modal, asking to confirm newGame settings.  If YES then // ng-click="app.createNewGame(app.players, app.teams);" // 
		app.showLoadGameButton = true;
	};

	$scope.data = {};

	// $scope.loginUser = function($scope) {
	// 	var newUser = LoginService.loginUser(data);
	//     	console.log("LOGIN user: " + $scope.data.userame + " - PW: " + $scope.data.password);

	//     	if (newUser) {
	// 		app.user.push(angular.extend({}, newUser));
	// 		console.log("app.user: " + app.user.length);
	//     	}

	//     	app.showMainMenu();
	// };


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

	
	// UserService.save({name: 'Saimon', email: 'saimon@devdactic.com'});
	// // UserService.update({user: 1}, {name: 'Saimon', email: 'saimon@devdactic.com'});
	// // UserService.update({user: 1, name: 'Saimon', email: 'saimon@devdactic.com'}, {});

	// var query = UserService.query();

	// query.$promise.then(function(data) {
	//     $scope.users = data;
	//     console.log("users from query.$promise: " + $scope.users);
	//     // Do whatever when the request is finished
	// });
	/**
	* DragPlayers to make Teams
	*
	*
	**/
	 $scope.centerAnchor = true;
        $scope.toggleCenterAnchor = function () {$scope.centerAnchor = !$scope.centerAnchor}

        //$scope.unassignedPlayers = app.players;
        $scope.droppedObjects1 = [];
        $scope.droppedObjects2= [];

        $scope.onDropComplete1=function(data,evt){
            var index = $scope.droppedObjects1.indexOf(data);
            var player = $scope.unassignedPlayers.indexOf(data);

            if (index == -1) {
              $scope.droppedObjects1.push(data); 
              $scope.assignPlayerTeam(data);
              $scope.soundClickOn();
            }
            if (player > -1) {
              $scope.unassignedPlayers.splice(player, 1);
            }
        }
        $scope.onDragSuccess1=function(data,evt){
            console.log("133","$scope","onDragSuccess1", "", evt);
            var index = $scope.droppedObjects1.indexOf(data);
            if (index > -1) {
                $scope.droppedObjects1.splice(index, 1);
            }
        }
        $scope.onDragSuccess2=function(data,evt){
            var index = $scope.droppedObjects2.indexOf(data);
            
            if (index > -1) {
                $scope.droppedObjects2.splice(index, 1);
                
            }
        }
        $scope.onDropComplete2=function(data,evt){
            var index = $scope.droppedObjects2.indexOf(data);
            var player = $scope.unassignedPlayers.indexOf(data);
            $scope.clickOn();

            if (index == -1) {
                $scope.droppedObjects2.push(data);
            }
          
            if (player > -1) {
              $scope.unassignedPlayers.splice(player, 1);
            }

        }

        var inArray = function(array, player) {
            var index = array.indexOf(player);
        }


        $scope.assignPlayerTeam = function(index) {
      
		var x = index;
		
		if ( app.players[x].team === team1 ) {
			alert(app.players[x].team + "is on team1");
		}

        	if (app.players[x].team === team2) {
        		//PlayerService.player.changeTeam(team1);
        		alert(app.players[x].team + "is on team2");
        	}
        	
        	

        };

	$scope.team1 = {
	    name: 'The Goodguys'
	};

	$scope.team2 = {
	    name: 'The Badguys'
	};


	app.demoMakePlayers = function() {
		console.log("game.demoMakePlayers() was called...");

		var p1 = PlayerService.newPlayer("Randy Jackson");
		app.players.push(angular.extend({}, p1));
		
		var p2 = PlayerService.newPlayer("Bert Rynolds");
		app.players.push(angular.extend({}, p2));
		
		var p3 = PlayerService.newPlayer("Sandra Bullock");
		app.players.push(angular.extend({}, p3));
		
		var p4 = PlayerService.newPlayer("Tim Taylor");
		app.players.push(angular.extend({}, p4));
		
		$scope.players = angular.copy(app.players);
		//$scope.player = game.players[0];
		//console.log(game.players[0].name);
		//console.log($scope.players);


		//PlayerService.logInfo();
		//p1.PlayerService.changeScore(5);
		
		 
		 //var p1Stats = PlayerService.player.logInfo(p1);
		 //sconsole.log(game.player[0]);
		// p4.PlayerService.logInfo();


	};


	app.demoMakeTeams = function() {
		console.log("game.demoMakeTeams() was called...");
		var gp0 = app.players[0];
		var gp1 = app.players[1];
		var gp2 = app.players[2];
		var gp3 = app.players[3];

		
		var team1 = TeamService.newTeam("Blue Team", [gp0, gp2]);

		app.teams.push(angular.extend({}, team1));

		var team2 = TeamService.newTeam("Red Team", [gp3, gp1]);

		app.teams.push(angular.extend({}, team2));
		//var object = angular.merge({}, object1, object2)

		$scope.teams = app.teams;


		// var at = 0; //active team
		// var ap = 0;  //active player

		// function playerSequence() {
		// 	if (game.teams.length === at ) {
		// 		at = 0;
		// 	}
		// 	if (game.teams.players.length === ap ) {
		// 		ap = 0;
		// 	}
		// 	game.activePlayer = game.teams[at].players[ap];
		// 	console.log(game.activePlayer);
		// 	nextPlayer(); 
		// }

		// function nextPlayer() {
		// 	at ++;
		// 	ap ++;
		// }
	       
	 //       playerSequence();
	      
		


 		for (var i = 0; i < app.teams.length; i++) {
	        var t = app.teams[i];
	      }

	      for (var n = 0; n < t.players.length; n++) {
	        var p = t.players[n];
	       // console.log("playerName: " + p.name + "playerScore: " + p.score);
	      }
	     console.log( p);
	 
	 
	};


	$scope.bootApp = function() {
		app.init()
	};

	$scope.hideLoading = function() {
	    $timeout(function() {
	        $ionicLoading.hide();
	    }, 1000);
	};
	$scope.hideLoading();
}])  //// @endAppController

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

.controller('CardsController', ['$scope', '$window', '$interval', '$timeout', '$ionicModal', '$ionicLoading', '$http', '$ionicSwipeCardDelegate', 'PlayerService', 'CardService', 'ModalService', 'CountdownService', 'DealerService', 
  function($scope, $window, $interval, $timeout, $ionicModal, $ionicLoading, $http, $ionicSwipeCardDelegate, PlayerService, CardService, ModalService, CountdownService, DealerService) {

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

	  $scope.reload = function(){
	    CardService.reload();
	  };

	  $scope.cardsControl = {};

	  $scope.cardDestroyed = function(index) {
	    $scope.cards.master.splice(index, 1);
	  };

	  $scope.deal = function() {
	  	$scope.hideCards = true;
	  	$scope.refreshCards();
	  	$scope.activeCards = DealerService.deal(3);

	  }

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


.controller('CardController', function($scope, $timeout, CardService) {

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


	console.log("$scope.products.length: " + $scope.products.length);
})