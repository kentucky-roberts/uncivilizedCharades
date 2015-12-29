angular
   .module('app.config', [
        'ionic',
        'ngCordova',
        'firebase',
         'ngAnimate',
         'ngTouch',
         'ngMessages',
         'ngDragDrop',
         'angular-svg-round-progress',
         'ionic.contrib.ui.tinderCards'
         //'ionic.contrib.ui.cards'
    ])

    .constant('$ionicLoadingConfig', {
      template: '<ion-spinner class="spinner" icon="ios"></ion-spinner>'
    })
