angular.module('bucketList.controllers', [])
    .controller('SignInCtrl', [
        '$scope', '$rootScope', '$firebaseAuth', '$window',
        function($scope, $rootScope, $firebaseAuth, $window) {
            // check session
            $rootScope.checkSession();

            $scope.user = {
                email: "",
                password: ""
            };
            $scope.validateUser = function() {
                $rootScope.show('Please wait.. Authenticating');
                var email = this.user.email;
                var password = this.user.password;
                if (!email || !password) {
                    $rootScope.notify("Please enter valid credentials");
                    return false;
                }

                $rootScope.auth.$login('password', {
                    email: email,
                    password: password
                }).then(function(user) {
                    $rootScope.hide();
                    $rootScope.userEmail = user.email;
                    $window.location.href = ('#/bucket/list');
                }, function(error) {
                    $rootScope.hide();
                    if (error.code == 'INVALID_EMAIL') {
                        $rootScope.notify('Invalid Email Address');
                    } else if (error.code == 'INVALID_PASSWORD') {
                        $rootScope.notify('Invalid Password');
                    } else if (error.code == 'INVALID_USER') {
                        $rootScope.notify('Invalid User');
                    } else {
                        $rootScope.notify('Oops something went wrong. Please try again later');
                    }
                });
            }
        }
    ])

.controller('SignUpCtrl', [
    '$scope', '$rootScope', '$firebaseAuth', '$window',
    function($scope, $rootScope, $firebaseAuth, $window) {

        $scope.user = {
            email: "",
            password: ""
        };
        $scope.createUser = function() {
            var email = this.user.email;
            var password = this.user.password;
            if (!email || !password) {
                $rootScope.notify("Please enter valid credentials");
                return false;
            }
            $rootScope.show('Please wait.. Registering');

            $rootScope.auth.$createUser(email, password, function(error, user) {
                if (!error) {
                    $rootScope.hide();
                    $rootScope.userEmail = user.email;
                    $window.location.href = ('#/bucket/list');
                } else {
                    $rootScope.hide();
                    if (error.code == 'INVALID_EMAIL') {
                        $rootScope.notify('Invalid Email Address');
                    } else if (error.code == 'EMAIL_TAKEN') {
                        $rootScope.notify('Email Address already taken');
                    } else {
                        $rootScope.notify('Oops something went wrong. Please try again later');
                    }
                }
            });
        }
    }
])

.controller('myListCtrl', function($rootScope, $scope, $window, $ionicModal, $firebase, ModalService) {
    
    $rootScope.show("Please wait... Processing");
    
    $scope.list = [];
    
    var bucketListRef = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
    
    bucketListRef.on('value', function(snapshot) {

        var data = snapshot.val();
        $scope.list = [];
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                if (data[key].isCompleted == false) {
                    data[key].key = key;
                    $scope.list.push(data[key]);
                }
            }
        }

        if ($scope.list.length == 0) {
            $scope.noData = true;
        } else {
            $scope.noData = false;
        }
        $rootScope.hide();
    });


     $scope.showNewPlayer = function() {
        ModalService
          .init('templates/modals/new-player.html', $scope)
          .then(function(modal) {
            modal.show();
          });
      };

    $scope.showNewGame = function() {
        ModalService
          .init('templates/modals/new-game.html', $scope)
          .then(function(modal) {
            modal.show();
          });
      };

    // $ionicModal.fromTemplateUrl('templates/newItem.html', function(modal) {
    //     $scope.newTemplate = modal;
    // });

    $scope.newTask = function() {
        //$scope.newTemplate.show();
        $scope.showNewPlayer();
    };

    $scope.markCompleted = function(key) {
        $rootScope.show("Please wait... Updating List");
        var itemRef = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail) + '/' + key);
        itemRef.update({
            isCompleted: true
        }, function(error) {
            if (error) {
                $rootScope.hide();
                $rootScope.notify('Oops! something went wrong. Try again later');
            } else {
                $rootScope.hide();
                $rootScope.notify('Successfully updated');
            }
        });
    };

    $scope.deleteItem = function(key) {
        $rootScope.show("Please wait... Deleting from List");
        var itemRef = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
        bucketListRef.child(key).remove(function(error) {
            if (error) {
                $rootScope.hide();
                $rootScope.notify('Oops! something went wrong. Try again later');
            } else {
                $rootScope.hide();
                $rootScope.notify('Successfully deleted');
            }
        });
    };
})

.controller('newCtrl', function($rootScope, $scope, $window, $firebase, ModalService) {
    $scope.data = {
        player: ""
    };

    $scope.close = function() {
        $scope.modal.hide();
    };

    $scope.createNew = function() {
        var player = this.data.player;
        if (!player) return;
        $scope.modal.hide();
        $rootScope.show();

        $rootScope.show("Please wait... Creating new");

        var form = {
            player: player,
            isCompleted: false,
            created: Date.now(),
            updated: Date.now()
        };

        var bucketListRef = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
        $firebase(bucketListRef).$add(form);
        $rootScope.hide();

    };
})

.controller('completedCtrl', function($rootScope, $scope, $window, $firebase) {
    $rootScope.show("Please wait... Processing");
    $scope.list = [];

    var bucketListRef = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
    bucketListRef.on('value', function(snapshot) {
        $scope.list = [];
        var data = snapshot.val();

        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                if (data[key].isCompleted == true) {
                    data[key].key = key;
                    $scope.list.push(data[key]);
                }
            }
        }
        if ($scope.list.length == 0) {
            $scope.noData = true;
        } else {
            $scope.noData = false;
        }

        $rootScope.hide();
    });

    $scope.deleteItem = function(key) {
        $rootScope.show("Please wait... Deleting from List");
        var itemRef = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
        bucketListRef.child(key).remove(function(error) {
            if (error) {
                $rootScope.hide();
                $rootScope.notify('Oops! something went wrong. Try again later');
            } else {
                $rootScope.hide();
                $rootScope.notify('Successfully deleted');
            }
        });
    };
});


function escapeEmailAddress(email) {
    if (!email) return false
    // Replace '.' (not allowed in a Firebase key) with ','
    email = email.toLowerCase();
    email = email.replace(/\./g, ',');
    return email.trim();
}
