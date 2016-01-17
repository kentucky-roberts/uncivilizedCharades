angular
  .module('app')
    .controller('AppController', AppController);

AppController.$inject = ['$scope', '$rootScope', '$firebaseAuth', '$window', '$interval', '$timeout', '$ionicModal', '$ionicLoading', '$http', '$ionicTabsDelegate', '$ionicPlatform', '$firebaseObject', 'ngAudio', 'ionicToast', '$ionicNavBarDelegate', 'PlayerService', 'CardService', 'ModalService', 'CountdownService', 'DealerService', 'AuthService', 'UserService', 'AppService', 'GameService', 'Games'];
function AppController($scope, $rootScope, $firebaseAuth, $window, $interval, $timeout, $ionicModal, $ionicLoading, $http, $ionicTabsDelegate, $ionicPlatform, $firebaseObject, ngAudio, ionicToast, $ionicNavBarDelegate, PlayerService, CardService, ModalService, CountdownService, DealerService, AuthService, UserService, AppService, GameService, Games) {

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
	$scope.saveNewGame = function(players) {
		// GameService.saveFirebaseGame();
		console.log("saveNewGame() called!");
	};


	// ////////////////////////////////////////
	// // Game Sound Effects
	// ////////////////////////////////////////
	// $scope.chaChing = ngAudio.load("sound/cha-ching.mp3"); // returns NgAudioObject
	// $scope.awww = ngAudio.load("sound/awww.mp3"); // returns NgAudioObject
	// $scope.crickets = ngAudio.load("sound/crickets.mp3"); // returns NgAudioObject
	// $scope.snowballSplat = ngAudio.load("sound/snowball-splat.mp3"); // returns NgAudioObject
	// $scope.squishFart = ngAudio.load("sound/squish-fart.mp3"); // returns NgAudioObject
	// $scope.voiceOn = ngAudio.load("sound/voice_on.mp3"); // returns NgAudioObject
	// $scope.voiceOff = ngAudio.load("sound/voice_off.mp3"); // returns NgAudioObject
	// $scope.clickOn = ngAudio.load("sound/click-on.mp3"); // returns NgAudioObject
	// $scope.clickOff = ngAudio.load("sound/click-off.mp3"); // returns NgAudioObject

	// $scope.soundChaChing = function() { $scope.chaChing.play(); };
	// $scope.soundAwww = function() { $scope.awww.play(); };
	// $scope.soundCrickets = function() { $scope.crickets.play(); };
	// $scope.soundSnowballSplat = function() { $scope.snowballSplat.play(); };
	// $scope.soundSquishFart = function() { $scope.squishFart.play(); };
	// $scope.soundVoiceOn = function() { $scope.voiceOn.play(); };
	// $scope.soundVoiceOff = function() { $scope.voiceOff.play(); };
	// $scope.soundClickOn = function() { $scope.clickOn.play(); };
	// $scope.soundClickOff = function() { $scope.clickOff.play(); };

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

}; //// @endAppController
