angular
  .module('app', [
        'ionic',
        'app.config', 
        'app.security',
        'app.login', 
        'app.animations',
        'app.directives', 
        'app.controllers', 
        'app.game',
        'app.services'
      ])

.run(['$ionicPlatform', '$rootScope', 'Auth', function($ionicPlatform, $rootScope, Auth) {       

      $ionicPlatform.ready(function() {

          if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

          }

          if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
          }

          Auth.$onAuth(function(user) {
            $rootScope.loggedIn = !!user;
          })

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
            nativeTransitions: {
                "type": "slide",
                "direction": "up"
            },
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
            nativeTransitions: {
                "type": "slide",
                "direction": "left"
            },
            templateUrl: 'templates/players.html',
            controller: 'AppController',
            controllerAs: 'app'
          }
        }
      })
      .state('tab.teams', {
        url: '/teams',
        views: {
          'tab-teams': {
            nativeTransitions: {
                "type": "slide",
                "direction": "left"
            },
            templateUrl: 'templates/teams.html'
          }
        }
      })
      .state('tab.main-menu', {
        url: '/main-menu',
        views: {
          'tab-main-menu': {
            nativeTransitions: null,
            templateUrl: 'templates/main-menu/main-menu.directive.html',
            controller: 'AppController',
            controllerAs: 'app'
          }
        }
      })
      .state('tab.game', {
          url: '/game',
          nativeTransitions: {
                "type": "slide",
                "direction": "down"
            },
          views: {
            'tab-game': {
              templateUrl: 'templates/game.html'
            }
          }
        })
       .state('tab.store', {
        url: '/store',
        nativeTransitions: {
            "type": "slide",
            "direction": "left"
        },
         views: {
          'tab-store': {
            templateUrl: 'templates/store/store.directive.html',
            controller: 'StoreController',
            controllerAs: 'store'
          }
        }
      })
      .state('tab.settings', {
          url: '/settings',
          nativeTransitions: {
                "type": "slide",
                "direction": "left"
            },
          views: {
            'tab-settings': {
              templateUrl: 'templates/settings/settings.directive.html'
            }
          }
        });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/login');
});