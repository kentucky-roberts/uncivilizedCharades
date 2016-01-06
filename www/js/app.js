angular
  .module('app', [
        'app.config', 
        'app.animations',
        'app.directives', 
        'app.controllers', 
        'app.services'
      ])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })


.config(function($stateProvider, $urlRouterProvider) {

 $stateProvider.state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })
      .state('tab.login', {
        url: '/login',
        views: {
          'tab-login': {
            templateUrl: 'templates/login.html',
            controller: 'AppController'
          }
        }
      })
      .state('tab.main-menu', {
        url: '/main-menu',
        views: {
          'tab-main-menu': {
            templateUrl: 'templates/main-menu.html',
            controller: 'AppController'
          }
        }
      })
      .state('tab.players', {
        url: '/players',
        views: {
          'tab-players': {
            templateUrl: 'templates/players.html'
          }
        }
      })
      .state('tab.teams', {
        url: '/teams',
        views: {
          'tab-teams': {
            templateUrl: 'templates/teams.html'
          }
        }
      })
      .state('tab.store', {
        url: '/store',
        views: {
          'tab-store': {
            templateUrl: 'templates/store.html'
          }
        }
      })
      .state('tab.game', {
          url: '/game',
          views: {
            'tab-game': {
              templateUrl: 'templates/game/new.game.directive.html'
            }
          }
        });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/login');
});