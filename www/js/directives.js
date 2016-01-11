
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
    templateUrl: 'templates/game/new.game.directive.html',
    controller: 'GameController',
    controllerAs: 'game'
  }
})




.directive('fabButton', function fabButtonDirective() {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            template: template,
            link: link
        };
        //isAnchor
        function isAnchor(attr) {
            return angular.isDefined(attr.href) || angular.isDefined(attr.ngHref);
        }
        //template
        function template(element, attr) {
            return isAnchor(attr) ?
                '<a class="fab-button" ng-transclude></a>' :
                '<button class="fab-button" ng-transclude></button>';
        }
        //link
        function link(scope, element, attr) {
            var target = '#'+attr['targetId'];
            //var bgColor = attr['bg-color'];
            //element.style=bgColor;
            var targetEl = angular.element(document.querySelector(target));
            var savePos = 0;
            targetEl.bind('scroll', function (e) {
                //console.log(savePos)
                if (savePos < e.detail.scrollTop) {
                    savePos = e.detail.scrollTop;
                    element.removeClass('fadeInUp animated');
                    element.addClass('fadeOutDown animated');
                }
                if (savePos > e.detail.scrollTop) {
                    savePos = e.detail.scrollTop;
                    element.removeClass('fadeOutDown animated');
                    element.addClass('fadeInUp animated');
                }
            });
        }
    });