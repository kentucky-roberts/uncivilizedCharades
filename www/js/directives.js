
angular
  .module('app.directives', [])
  
//start the ionic-ion-swipe-cards js for app
.directive('noScroll', function($document) {

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {

      $document.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  }
})

.directive('charadesGame', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/game/game.directive.html',
    controller: 'GameController',
    controllerAs: 'game'
  }
})

