angular
  .module('app', [
        'ionic',
        'app.config', 
        'app.security',
        'app.login', 
        'ngRoute', 
        'app.animations',
        'app.directives', 
        'app.controllers', 
        'app.game',
        'app.services'
      ])

    .run(['$ionicPlatform', '$rootScope', function($ionicPlatform, $rootScope) {       

      $ionicPlatform.ready(function() {

          if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

          }

          if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
          }

      });
    }])

.config(function($stateProvider, $urlRouterProvider, $ionicNativeTransitionsProvider) {

 $stateProvider.state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })
      .state('tab.login', {
        url: '/login',
        views: {
          'tab-login': {
            nativeTransitions: null,
            cache: false,
            templateUrl: 'templates/login/login.directive.html',
            controller: 'LoginController'
          }
        }
      })
      .state('intro', {
        url: '/intro',
        templateUrl: 'templates/intro.html',
        controller: 'IntroController'
      })
      .state('tab.players', {
        url: '/players',
        views: {
          'tab-players': {
            nativeTransitions: null,
            cache: false,
            templateUrl: 'templates/players.html',
            controller: 'GameController'
          }
        }
      })
      .state('tab.teams', {
        url: '/teams',
        views: {
          'tab-teams': {
            nativeTransitions: null,
            cache: false,
            templateUrl: 'templates/teams.html',
            controller: 'GameController',
            controllerAs: 'game'
          }
        }
      })
      .state('tab.main-menu', {
        url: '/main-menu',
        views: {
          'tab-main-menu': {
            nativeTransitions: null,
            cache: false,
            templateUrl: 'templates/main-menu/main-menu.directive.html',
            controller: 'AppController'
          }
        }
      })
      .state('tab.game', {
          url: '/game',
          views: {
            'tab-game': {
              nativeTransitions: null,
              cache: false,
              templateUrl: 'templates/game/new.game.directive.html',
              controller: 'GameController',
              controllerAs: 'game'
            }
          }
        })
       .state('tab.store', {
          url: '/store',
          views: {
            'tab-store': {
              nativeTransitions: null,
              cache: false,
              templateUrl: 'templates/store/store.directive.html',
              controller: 'StoreController'
            }
          }
        })
      .state('tab.settings', {
          url: '/settings',
          views: {
            'tab-settings': {
              nativeTransitions: null,
              cache: false,
              templateUrl: 'templates/settings/settings.directive.html',
              controller: 'SettingsController'
            }
          }
        });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/login');
});