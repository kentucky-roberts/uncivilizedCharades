
angular
  .module('app', [])



.controller('CardListController', ['$scope', 'CardType',
  function($scope, CardType) {
    $scope.cards = CardType.findRange();
    $scope.orderProp = 'phrase';

  }])

