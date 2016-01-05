angular
   .module('app.config', [
        'ionic',
        'ngCordova',
        'firebase',
         'ngAnimate',
         'ngTouch',
         'ngMessages',
         //'ngDraggableDrop',
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
