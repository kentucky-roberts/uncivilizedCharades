
angular
  .module('app')
    .controller('CardController', CardController);


CardController.$inject = ['$scope', '$rootScope', 'CardService', 'CountdownService'];

function CardController($scope, $rootScope, CardService, CountdownService) {

	$scope.cardSwipedLeft = function(index) {
	    console.log('LEFT SWIPE destroied card');
	    CardService.destroyCard(index);
	   // $scope.addCard();
	};
	$scope.cardSwipedRight = function(index) {
	    console.log('RIGHT SWIPE');
	    CardService.destroyCard(index);

	   // $scope.addCard();
	};

	$scope.cardSwipedDown = function(index) {
	    console.log('DOWN SWIPE');
	  //  $scope.addCard();
	};

	$scope.cardSwipedUp = function(index) {
	    console.log('UP SWIPE from CardController');
	    CardService.activateCard(index);

	    //$scope.addCard();
	};
};
