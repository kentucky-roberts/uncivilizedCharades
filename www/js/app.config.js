angular
   .module('app.config', [
        'ionic.service.core', 
        'ngCordova', 
        'ionic-native-transitions', 
        'firebase.auth', 
        'firebase', 
        'firebase.utils', 
        'ngRoute',
        'ngResource',
        'ngAnimate',
        'ngTouch',
        'ngAudio', 
        'ngMessages',
        'ngDraggable',
        'ionic-toast',
        'xeditable',
        'angular-svg-round-progress',
        'ion-fab-button',
        'ionic.contrib.frost',          
        'ionic.contrib.ui.tinderCards'
       //'ionic.contrib.ui.cards'
    ])

    .constant('version', '1.0.0')

    .constant('$ionicLoadingConfig', {
      template: '<ion-spinner class="spinner" icon="ios"></ion-spinner>'
    })

      // where to redirect users if they need to authenticate (see security.js)
      .constant('loginRedirectPath', '/login')

      // your Firebase data URL goes here, no trailing slash
      .constant('FBURL', 'https://charades-app.firebaseio.com')
    
      // double check that the app has been configured before running it and blowing up space and time
      .run(['FBURL', '$timeout', function(FBURL, $timeout) {
        if( FBURL.match('//INSTANCE.firebaseio.com') ) {
          angular.element(document.body).html('<h1>Please configure app/config.js before running!</h1>');
          $timeout(function() {
            angular.element(document.body).removeClass('hide');
          }, 250);
        }
      }]);
