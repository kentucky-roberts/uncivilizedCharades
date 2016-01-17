
angular
  .module('app')
    .controller('CardController', CardController);


CardController.$inject = ['$scope', '$rootScope', 'CardService', 'CountdownService'];

function CardController($scope, $rootScope, CardService, CountdownService) {

	$scope.cardSwipedLeft = function(index) {
	    console.log('LEFT SWIPE');
	   // $scope.addCard();
	};
	$scope.cardSwipedRight = function(index) {
	    console.log('RIGHT SWIPE');
	   // $scope.addCard();
	};

	$scope.cardSwipedDown = function(index) {
	    console.log('DOWN SWIPE');
	  //  $scope.addCard();
	};

	$scope.cardSwipedUp = function(index) {
	    console.log('UP SWIPE');
	    //$scope.addCard();
	};
};
