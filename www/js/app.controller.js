angular
  .module('app')
    .controller('AppController', AppController);

AppController.$inject = ['$scope', '$rootScope', '$state', '$firebaseAuth', '$window', '$interval', '$timeout', '$ionicModal', '$ionicLoading', '$http', '$ionicTabsDelegate', '$ionicPlatform', '$firebaseObject', 'ngAudio', 'ionicToast', '$ionicNavBarDelegate', 'PlayerService', 'CardService', 'ModalService', 'CountdownService', 'DealerService', 'AppService', 'GameService', 'Games', 'MessageService', 'DemoService'];
function AppController($scope, $rootScope, $state, $firebaseAuth, $window, $interval, $timeout, $ionicModal, $ionicLoading, $http, $ionicTabsDelegate, $ionicPlatform, $firebaseObject, ngAudio, ionicToast, $ionicNavBarDelegate, PlayerService, CardService, ModalService, CountdownService, DealerService, AppService, GameService, Games, MessageService, DemoService) {

	$scope.showLoading = function() {
		$ionicLoading.show();
	}; $scope.showLoading();

	var app = this;

	var message = {};
	$scope.players = [];
	app.players = [];
	$scope.user = [];

	//$state.go("tab.teams");


	$scope.initApp = function() {
		$scope.gameStarted = false;
		$scope.slides = [];
          	$scope.activeQuestion = 0;
          	$scope.welcomeUser();
          	app.team1Score = 0;
          	app.team2Score = 0;

          	$scope.team1Score = 0;
          	$scope.team2Score = 0;

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




////////////////////////////////////////
//  players
////////////////////////////////////////
var players =
    $http.get('api/players.json').then(function(playerData) {
        app.players = playerData.data;
        console.log(app.players[0]);
        app.totalPlayers = app.players.length;
    });

$scope.players = players;

////////////////////////////////////////
//  card_types
////////////////////////////////////////
var p =
    $http.get('api/card_types.json').then(function(phraseData) {
        app.phrases = phraseData.data;
        console.log(app.phrases[0]);
        app.totalPhrases = app.phrases.length;
    });

$scope.phrases = p;


////////////////////////////////////////
//  Start Game!!
////////////////////////////////////////

	$scope.startGame = function() {
	    console.log("Start Game!");
	    $scope.gameStarted = true;
	    app.step = 0;
	    app.playerCount = 0;
	    $scope.step = app.step;
	    //$scope.activeQuestion = app.questions[app.step].question;

	    $scope.activePhrase = app.phrases[app.step].phrase;
	    $scope.activePlayer = app.players[app.playerCount];

	    $scope.selectActiveTeam();
	};

	$scope.nextStep = function() {
	    console.log("Next Step called ... ");

	    var maxPlayers = app.players.length;
	    if (app.playerCount === maxPlayers) {
	    		app.playerCount = 0;
	    }

	    app.step += 1;
	    app.playerCount += 1;
	    $scope.step = app.step;
	    //$scope.activeQuestion = app.questions[app.step].question;



	    $scope.activePlayer = app.players[app.playerCount];
	    $scope.activePhrase = app.phrases[app.step].phrase;
	   // $("animated ").addClass("bounceOutUp");

	   $scope.selectActiveTeam();
	};

	$scope.lastStep = function() {
	      app.step -= 1;
	      $scope.step = app.step;
	      app.playerCount -= 1;
	      //$scope.activeQuestion = app.questions[app.step].question;
	       $scope.activePlayer = app.players[app.step];
	      $scope.activePhrase = app.phrases[app.step].phrase;
	};

	$scope.firstStep = function() {
	    app.step = 1;
	    app.playerCount = 0;
	    $scope.step = app.step;
	};

	$scope.resetGame = function() {
	    app.step = 0;
	    app.playerCount = 0;
	    $scope.gamestarted = false;
	    $scope.step = app.step;
	    //$scope.activeQuestion = 0;
	    $scope.activePhrase = 0;
	    $scope.activePlayer = 0;
	    $scope.team1Score = 0;
	    $scope.team2Score = 0;
	    $scope.winningTeam = null;
	};


	$scope.addPointToActiveTeam = function() {

	    if (app.step % 2 == 0 && app.step != 1) {

	        $scope.activeTeam = "Team1";
	        $scope.team1Score += 1;
	        $scope.teamColor = "positive";


	  	   if ($scope.team1Score === 10 ) {
		    	$scope.gameStarted = true;
		    	$scope.gameOver = true;
		    	$scope.winningTeam = "Team2";
		   }
	        return;

	    } else {
	        $scope.activeTeam = "Team2";
	        $scope.team2Score += 1;
		  $scope.teamColor = "assertive";

		  if ($scope.team2Score === 10 ) {
		    	$scope.gameStarted = true;
		    	$scope.gameOver = true;
		    	$scope.winningTeam = "Team2"
		  }
	        return;
	    }
	};


	$scope.selectActiveTeam = function() {

	    if (app.step % 2 == 0 && app.step != 1) {

	        app.activeTeam = "Team1";
	        console.log(app.activeTeam);
	        $scope.teamColor = "positive";
	        $scope.teamCss = "bg-team1";
	        return;

	    } else {
	        app.activeTeam = "Team2";
	        console.log(app.activeTeam);
	        $scope.teamColor = "assertive";
	        $scope.teamCss = "bg-team2";
	        return;
	    }

	};






	// $scope.discard = function($index) {
	//     var discarded = $scope.cards.master.splice($scope.cards.master.indexOf(card), 1);
	 //  	 $scope.cards.discards.push(discarded);
	// };

	// $scope.activate = function($index) {
	// 	var activatedQuestion = $index;
	//     $scope.questions.activated.push(angular.extend({}, activatedQuestion));
	// };

	// $scope.addQuestions = function() {
	//     var newQuestion = questions.master[Math.floor(Math.random() * questions.master.length)];
	//     newQuestion.id = Math.random();
	//     $scope.questions.active.push(angular.extend({}, newQuestion));
	//     $scope.activeQuestion = newQuestion;
	//     console.log()
	// };







	//  FYI  $state.reload()  is the shorthand way to do the following...
	//
	// 	$state.transitionTo($state.current, $stateParams, {
	//       reload: true, inherit: false, notify: false
	//     });

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


	$scope.initApp();

	$scope.hideLoading = function() {
	    $timeout(function() {
	        $ionicLoading.hide();
	    }, 1000);
	};
	$scope.hideLoading();

}; //// @endAppController
