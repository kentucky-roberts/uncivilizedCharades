angular
   .module('app.config', [
        'ionic.service.core',
        'ngCordova',
        'firebase',
        'ngRoute',
        'ngTouch',
        'ngAudio',
        'ngAnimate',
        'xeditable',
        'ngResource',
        'ngMessages',
        'ngDraggable',
        'ionic-toast',
        'ion-fab-button',
        'angular-svg-round-progress',
        'ionic.contrib.ui.tinderCards'
      //'ionic.contrib.ui.cards'
    ])

    .constant('version', '1.0.0')
    .constant('$ionicLoadingConfig', {
      template: '<ion-spinner class="spinner" icon="ios"></ion-spinner>'
    })
