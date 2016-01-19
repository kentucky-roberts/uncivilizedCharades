angular
  .module('app')
    .controller('CardsController', CardsController);

CardsController.$inject = ['$scope', '$rootScope',  '$window', '$interval', '$timeout', '$ionicModal', '$ionicLoading', '$http', '$ionicTabsDelegate', 'ionicToast', 'ngAudio', 'CardService', 'CountdownService', 'ModalService'];

function CardsController($scope, $rootScope, $window, $interval, $timeout, $ionicModal, $ionicLoading, $http, $ionicTabsDelegate, ionicToast, ngAudio, CardService, CountdownService, ModalService) {

  	var cardTypes = CardService.all();
  	var threeCards = CardService.threeCards();

	$scope.cards = {
	    master: threeCards,
	    active: [],
	    activeCard: [],
	    discards: [],
	};

	$scope.playerCards = {};
	$scope.activeCards = [];
	$scope.cardsControl = {};

	$scope.cardDestroyed = function(index) {
	    $scope.cards.master.splice(index, 1);  // Remove a card from ->  $scope.cards.master
	};

	$scope.deal = function() {
	    $scope.refreshCards;
	    //$scope.activeCards = DealerService.dealThreeCards();
	    var dealtCards = CardService.dealCards();
	    $scope.cards.active.push(angular.extend({}, dealtCards));
	    $scope.cardsVisible = false;
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
	    //console.log('UP SWIPE');
	    $scope.activateCard(index);
	    $scope.newCountdown();
	    // $scope.showCountdown =  function() {
	    // 	  CountdownService.setTrueTag();
	    // }
	    // //$scope.showCountdown();
	    //$("td-card").addClass("hidden");
	};


	$scope.noPoint = function() {
		$scope.deActivateCard();
	};

	  // $scope.newCountdown = function() {
	  //   ModalService
	  //     .init('templates/modals/countdown-timer.html', $scope)
	  //     .then(function(modal) {
	  //       modal.show();
	  //     });
	  // };

	$scope.cardSwipedLeft = function(index) {
	   
	    //$scope.addCard();
	    $scope.cardDestroyed(index);
	};

	$scope.cardSwipedRight = function(index) {
	    //console.log('RIGHT SWIPE');
	    // $scope.addCard();
	    $scope.cardDestroyed(index);
	};

	$scope.activateCard = function(index) {
	    //console.log("activeCard index: " + index);
	    $scope.cards.master.splice(index, 1);
	    $scope.cards.activeCard.push(angular.extend({}, index));
	    console.log($scope.cards.activeCard);
	    $("td-card").addClass("hidden");
	    var activeCard = CardService.activeCard(index);

		CountdownService.setFalseTag();
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
};
