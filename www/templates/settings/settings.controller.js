angular.module('app.settings', [])

.controller('SettingsController', 
  function($scope, $ionicModal, $timeout, $rootScope) {

    $scope.master = {};
    $scope.demoUsername = "Jerry Rice";

    $scope.maxScoreList = [
      { text: "5 Points", value: "5" },
      { text: "10 Points", value: "10" },
      { text: "15 Points", value: "15" }
    ];

    $scope.secondsRemainingList = [
      { text: "60 seconds", value: "60" },
      { text: "90 seconds", value: "90" },
      { text: "120 seconds", value: "120" }
    ];
    
    $scope.settingsData = {
      maxScore: '10',
      secondsRemaining: '60'
    };
    
    $scope.secondsRemainingChange = function(item) {
      console.log("secondsRemaining text:", item.text, "value:", item.value);
      $scope.master = angular.copy(item);
    };

    $scope.maxScoreChange = function(item) {
      console.log("maxScoreChange text:", item.text, "value:", item.value);
      $scope.master = angular.copy(item);

    };

    $scope.doSettings = function(item) {
      $rootScope.maxScore = $scope.settingsData.maxScore;
      $rootScope.secondsRemaining = $scope.settingsData.secondsRemaining;
      console.log('master: ', $rootScope.master);
      console.log('maxScore: ', $scope.maxScore);
      console.log('secondsRemaining: ', $scope.secondsRemaining);

      return;
    };




  })
