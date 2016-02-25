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
		console.log("$scope.cardDestroyed(index) was called here");
	   // $scope.cards.master.splice(index, 1);  // Remove a card from ->  $scope.cards.master

	var recycledCard = cardTypes[index];
	    $scope.cards.master.push(angular.extend({}, recycledCard));

	};

	$scope.showAltPhrase = false;
	$scope.togglePhrases = function () {
		if ($scope.showAltPhrase == false) {
			$scope.showAltPhrase = true;
		} else  $scope.showAltPhrase = false;
	};


	$scope.deal = function() {
	    $scope.refreshCards();
	    //$scope.activeCards = DealerService.dealThreeCards();
	    // var dealtCards = threeCards ;
	    // // $scope.cards.active.push(angular.extend({}, dealtCards));
	    // $scope.addCard();
	    // $scope.addCard();
	    // $scope.addCard();
	    $scope.cardsVisible = false;
	}

	$scope.addCard = function() {
	    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
	    newCard.id = Math.random();
	    $scope.cards.master.push(angular.extend({}, newCard));
	};

	$scope.refreshCards = function() {
	    // Set $scope.cards to null so that directive reloads
	    $scope.cardsVisible = false;
	    //$scope.cards.active = null;
	     Array.prototype.slice.call($scope.cards.master, 0);
	     Array.prototype.slice.call($scope.cards.active, 0);

	};


	  // $scope.newCountdown = function() {
	  //   ModalService
	  //     .init('templates/modals/countdown-timer.html', $scope)
	  //     .then(function(modal) {
	  //       modal.show();
	  //     });
	  // };

	$scope.cardSwipedLeft = function(index) {
		console.log('LEFT SWIPE');
	    //$scope.addCard();
	 //   $scope.cardDestroyed(index);
	};

	$scope.cardSwipedRight = function(index) {
	    console.log('RIGHT SWIPE');
	    //$scope.addCard();
	   // $scope.cardDestroyed(index);
	};

	$scope.activateCard = function(index) {
	    console.log("activeCard index: " + index);
	    $scope.cards.master.splice(index, 1);
	    $scope.cards.activeCard.push(angular.extend({}, index));
	    console.log($scope.cards.activeCard);

  		var activeCard = CardService.activeCard(index);

		CountdownService.setFalseTag();


	    console.log(activeCard);
	};


	$scope.showActiveCardFace = function() {
		$scope.activeCardFaceVisible = true;
	};

	// $scope.showActiveCard = function(index) {

	// 	$scope.cards.activeCard

	//     console.log($scope.cards.activeCard);

	//     $("td-card").addClass("hidden");

	//     		var activeCard = CardService.activeCard(index);

	// 	CountdownService.setFalseTag();
	//     console.log(activeCard);
	// };



	$scope.cardSwipedUp = function(index) {
	    console.log('UP SWIPE');

	    $scope.activateCard(index);

	    $scope.cardsVisible = false;
	    $scope.activeCardVisible = false;
	    $scope.activeCardFaceVisible = false;

	};


	$scope.stealPoint = function() {
		$scope.cardsVisible = false;
		$scope.activeCardVisible = true;
		$scope.activeCardFaceVisible = false;
		$("td-card").removeClass("hidden");
	};

	$scope.showActiveCardFace = function () {
		$scope.cardsVisible = false;
		$scope.activeCardVisible = true;
		$scope.activeCardFaceVisible = true;
	};

	$scope.hideActiveCard = function () {
		$scope.cardsVisible = false;
		$scope.activeCardVisible = false;
		$scope.activeCardFaceVisible = false;
	};

	$scope.nextHand = function() {

		CountdownService.setTrueTag();
		$scope.hideActiveCard();
		//$scope.deActivateCard();
		$scope.refreshCards();
		// $scope.modal.close();

	};

	$scope.noPoint = function() {
		$scope.deActivateCard();
	};

	$scope.deActivateCard = function(index) {
	    $scope.cards.activeCard.splice(index, 1);
	    		$scope.cardDestroyed(index);
	    console.log($scope.cards.activeCard);
	};

	$scope.$on('removeCard', function(event, element, card) {
	    var discarded = $scope.cards.master.splice($scope.cards.master.indexOf(card), 1);
	    		$scope.cards.discards.push(discarded);
	    		console.log($scope.cards.discards);
	});
};
