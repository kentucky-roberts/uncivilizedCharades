angular
  .module('app', [
        'ionic',
        'app.config',
        'app.animations',
        'app.directive',
        'app.service', 
        'app.game',
        'app.filter',
        'app.auth'
      ])

      .run(function($ionicPlatform, $rootScope, $firebaseAuth, $firebase, $window, $ionicLoading) {
        $ionicPlatform.ready(function() {
          // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
          // for form inputs)
          if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          }
          if (window.StatusBar) {
            StatusBar.styleDefault();
          }

          $rootScope.userEmail = null;
          $rootScope.baseUrl = 'https://charades-app.firebaseio.com/';
          var authRef = new Firebase($rootScope.baseUrl);
          $rootScope.auth = $firebaseAuth(authRef);

          $rootScope.show = function(text) {
            $rootScope.loading = $ionicLoading.show({
              content: text ? text : 'Loading..',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
            });
          };

          $rootScope.hide = function() {
            $ionicLoading.hide();
          };

          $rootScope.notify = function(text) {
            $rootScope.show(text);
            $window.setTimeout(function() {
              $rootScope.hide();
            }, 1999);
          };

          $rootScope.logout = function() {
            $rootScope.auth.$logout();
            $rootScope.checkSession();
          };

          $rootScope.checkSession = function() {
            var auth = new FirebaseSimpleLogin(authRef, function(error, user) {
              if (error) {
                // no action yet.. redirect to default route
                $rootScope.userEmail = null;
                $window.location.href = '#/auth/signin';
              } else if (user) {
                // user authenticated with Firebase
                $rootScope.userEmail = user.email;
                $window.location.href = ('#/main-menu');
              } else {
                // user is logged out
                $rootScope.userEmail = null;
                $window.location.href = '#/auth/signin';
              }
            });
          }
        });
      })

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('auth', {
        url: "/auth",
        abstract: true,
        templateUrl: "templates/auth.html"
      })
      .state('auth.signin', {
        url: '/signin',
        views: {
          'auth-signin': {
            templateUrl: 'templates/auth/auth-signin.html',
            controller: 'SigninController'
          }
        }
      })
      .state('auth.signup', {
        url: '/signup',
        views: {
          'auth-signup': {
            templateUrl: 'templates/auth/auth-signup.html',
            controller: 'SigninController'
          }
        }
      })


      .state('intro', {
        url: '/intro',
        templateUrl: 'templates/intro.html',
        controller: 'IntroController'
      })


    .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })
      .state('tab.players', {
        url: '/players',
        views: {
          'tab-players': {
            cache: false,
            templateUrl: 'templates/players/players.html',
            controller: 'GameController', 
            controllerAs: 'game'
          }
        }
      })
      .state('tab.teams', {
        url: '/teams',
        views: {
          'tab-teams': {
            cache: false,
            templateUrl: 'templates/teams/teams.html',
            controller: 'GameController',
            controllerAs: 'game',
          }
        }
      })
      .state('tab.main-menu', {
        url: '/main-menu',
        views: {
          'tab-main-menu': {
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
              cache: false,
              templateUrl: 'templates/game/game.directive.02.html',
              controller: 'GameController',
              controllerAs: 'game'
            }
          }
        })
       .state('tab.store', {
          url: '/store',
          views: {
            'tab-store': {
              cache: false,
              templateUrl: 'templates/store/store.directive.html',
              controller: 'StoreController',
              controllerAs: 'store'
            }
          }
        })

        .state('tab.card-list', {
          url: '/card-list',
          views: {
            'tab-card-list': {
              templateUrl: 'templates/card-list.html',
              controller: 'GameController'
            }
          }
        })


      .state('tab.settings', {
          url: '/settings',
          views: {
            'tab-settings': {
              cache: false,
              templateUrl: 'templates/settings/settings.directive.html',
              controller: 'SettingsController',
              controllerAs: 'settings'
            }
          }
        });
  // if none of the above states are matched, use this as the fallback
     $urlRouterProvider.otherwise('/tab/main-menu');
});
