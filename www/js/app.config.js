angular
   .module('app.config', [
        'ngCordova',
        'firebase',
        'ngResource',
         'ngAnimate',
         'ngTouch',
         'ngMessages',
         'ngDraggable',
         'xeditable',
         'angular-svg-round-progress',
         'ngAudio'
         //'ionic.contrib.ui.tinderCards'
         //'ionic.contrib.ui.cards'
    ])

    .constant('$ionicLoadingConfig', {
      template: '<ion-spinner class="spinner" icon="ios"></ion-spinner>'
    })
