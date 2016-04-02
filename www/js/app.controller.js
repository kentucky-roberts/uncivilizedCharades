angular
  .module('app')
    .controller('AppController', AppController);

AppController.$inject = ['$scope', '$rootScope', '$state', '$firebaseAuth', '$window', '$interval', '$timeout', '$ionicModal', '$ionicLoading', '$http', '$ionicTabsDelegate', '$ionicPlatform', '$firebaseObject', 'ngAudio', 'ionicToast', '$ionicNavBarDelegate', 'PlayerService', 'CardService', 'ModalService', 'CountdownService', 'DealerService', 'AppService', 'GameService', 'Games', 'MessageService', 'DemoService'];
function AppController($scope, $rootScope, $state, $firebaseAuth, $window, $interval, $timeout, $ionicModal, $ionicLoading, $http, $ionicTabsDelegate, $ionicPlatform, $firebaseObject, ngAudio, ionicToast, $ionicNavBarDelegate, PlayerService, CardService, ModalService, CountdownService, DealerService, AppService, GameService, Games, MessageService, DemoService) {


	var app = this;
	// var game = this;

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

      $scope.noHeader();

	var message = {};
	$scope.players = [];
	app.players = [];
	$scope.user = [];

	//$state.go("tab.teams");


	$scope.showLoadGameButton = false;  // main-menu buttons will appear when true
  $scope.showSavedGame = false;  // main-menu buttons will appear when true
  $scope.showSavedGames = false; //main-menu button appear when true -> list a users saved games to Load.



	$scope.initApp = function() {
		$scope.gameStarted = false;
		//gameSlideActive  = false;
		//$scope.slides = [];
          	$scope.activeQuestion = 0;
          	$scope.welcomeUser();
          	$scope.needsPlayers = true;
          	// app.team1Score = 0;
          	// app.team2Score = 0;

          	// $scope.team1Score = 0;
          	// $scope.team2Score = 0;

            $scope.gameHasPlayers = false;
        		$scope.appStarted = false;
        		$scope.mainMenu = false;
        		$scope.quickStart = false;
        		$scope.gameStarted = false;
        		$scope.gamePreflight= false;
        		$scope.gameOver = false;


  //         	$state.go('tab.splash-screen');
  //         	$scope.showSplashScreen = function() {
		//     $timeout(function() {
		//     	 $state.go('tab.splash-screen');
		//     }, 5000);
		// };
		// $scope.showSplashScreen();
	};



        //////////////////////////////////////
       //  Start Pre-Game!!
        //////////////////////////////////////
        $scope.startApp = function() {
          $scope.appStarted = true; // init
          $scope.mainMenu = true;
          $scope.quickStart = false;
          $scope.gameStarted = false;
          $scope.gamePreflight = false;
          $scope.gameOver = false;
        };



        $scope.gameWithPlayers = function() { // game with players
            $scope.gameHasPlayers = true;
            $scope.gameType = true; // we have chosen a gameType no longer need to see the option buttons
            $scope.startPreflight(); // this is where we build players, select teams for game.  screen has startGame() button to begin actual game
        };

        $scope.startPreflight = function() {
            $scope.gamePreflight = false;

            // game.quickStart = false;
            // game.preflight  = true;
            // game.started  = false;
            // game.over  = false;
        };

        $scope.gameWithTeams = function() { // game without players
            $scope.gameHasPlayers = false;
            $scope.gameType = true; // we have chosen a gameType no longer need to see the option buttons
            $scope.editTeamNames = true;

            // game.preflight  = false;
            // game.quickStart = true;
            // game.started  = false;
            // game.over  = false;
            $scope.initQuickStart();
        };






		$scope.welcomeUser = function() {
			MessageService.addMessage('Welcome to Uncivilized Charades!', 'yellow-text');
		};



	    $scope.doGood = function() {
	        MessageService.addMessage('Yay!', 'alert-success');
	    };
	    $scope.doEvil = function() {
	        MessageService.addMessage('Noooo!', 'alert-error');
	    };
	    $scope.reset = function() {
	        MessageService.clearMessages();
	    };


	// $scope.startGameTeamsOnly function () {
	// 	var players =
	// 	    $http.get('api/players.json').then(function(playerData) {
	// 	        app.players = playerData.data;
	// 	        console.log(app.players[0]);
	// 	        app.totalPlayers = app.players.length;
	// 	    });
	// 	$scope.players = players;
	// };



      ////////////////////////////////////////
      // ionicSlideBoxDeligate
      ////////////////////////////////////////

      $scope.next = function () {
        $ionicSlideBoxDelegate.next();
      };
      $scope.previous = function () {
        $ionicSlideBoxDelegate.previous();
      };
      // Called each time the slide changes
      $scope.slideChanged = function (index) {
        $scope.slideIndex = index;
        console.log("slideChanged: " + index);
      };






	$scope.saveGame = function() {
		console.log("saveGame!");
	};

      ////////////////////////////////////////
      // ModalService
      ////////////////////////////////////////

	$scope.showLogin = function() {
          ModalService
              .init('templates/modals/login-user.html')
              .then(function(modal) {
                  modal.show();
              });
      };

      $scope.showNewGame = function() {
          ModalService
              .init('templates/modals/new-game.html', $scope)
              .then(function(modal) {
                  modal.show();
              });
      };



	//  FYI  $state.reload()  is the shorthand way to do the following...
	//
		// $state.transitionTo($state.current, $stateParams, {
	 //      reload: true, inherit: false, notify: false
	 //    });
	$scope.initApp();
}; //// @endAppController
