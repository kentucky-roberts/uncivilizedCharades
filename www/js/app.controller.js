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
	$scope.user = [];

	$state.go("tab.teams");


	$scope.welcomeUser = function() {
		MessageService.addMessage('Welcome to Uncivilized Charades!', 'yellow-text');
	};

	$scope.welcomeUser();

	    $scope.doGood = function() {
	        MessageService.addMessage('Yay!', 'alert-success');
	    };
	    $scope.doEvil = function() {
	        MessageService.addMessage('Noooo!', 'alert-error');
	    };
	    $scope.reset = function() {
	        MessageService.clearMessages();
	    };
	


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


	$scope.hideLoading = function() {
	    $timeout(function() {
	        $ionicLoading.hide();
	    }, 1000);
	};
	$scope.hideLoading();

}; //// @endAppController
