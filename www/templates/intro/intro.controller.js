angular
.module('app.intro')
  .controller('IntroController', IntroController);

  function IntroController($scope, $state, $ionicSlideBoxDelegate) {

    $scope.startApp = function() {
        $state.go('app.game');
    };
    $scope.next = function() {
        $ionicSlideBoxDelegate.next();
    };
    $scope.previous = function() {
        $ionicSlideBoxDelegate.previous();
    };
    $scope.slideChanged = function(index) {
        $scope.slideIndex = index;
    };
  };