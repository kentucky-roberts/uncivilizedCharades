angular
  .module('app')
    .controller('CardsController', CardsController);

CardsController.$inject = ['$scope','$rootScope', '$timeout', 'ngAudio', 'CardService', 'CountdownService', 'ModalService'];

function CardsController($scope, $rootScope, $timeout, ngAudio, CardService, CountdownService, ModalService) {

  	var cardTypes = CardService.all();
  	var threeCards = CardService.threeCards();

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
	    $scope.refreshCards
	    $scope.activeCards = CardService.threeCards();
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
		$scope.newCountdown();
	    // $scope.showCountdown =  function() {
	    // 	  CountdownService.setTrueTag();
	    // }
	    // //$scope.showCountdown();
	    //$("td-card").addClass("hidden");
	};

	  $scope.newCountdown = function() {
	    ModalService
	      .init('templates/modals/countdown-timer.html', $scope)
	      .then(function(modal) {
	        modal.show();
	      });
	  };

	$scope.cardSwipedLeft = function(index) {
	    console.log('LEFT SWIPE');
	    //$scope.addCard();
	    $scope.cardDestroyed(index);
	};

	$scope.cardSwipedRight = function(index) {
	    console.log('RIGHT SWIPE');
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
