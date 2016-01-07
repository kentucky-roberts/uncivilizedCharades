
angular
  .module('app.controllers', [])

.controller('AppController', function($scope, LoginService, UserService, PlayerService, GameService, ngAudio, $ionicPopup, $state, $http, $ionicModal, $timeout) {

	////////////////////////////////////////
	// User Authentication
	////////////////////////////////////////
	$scope.data = {};
	$scope.login = function($scope) {
	    console.log("LOGIN user: " + $scope.data.userame + " - PW: " + $scope.data.password);
	};

	////////////////////////////////////////
	// Game Sound Effects
	////////////////////////////////////////
	$scope.chaChing = ngAudio.load("sound/cha-ching.mp3"); // returns NgAudioObject
	$scope.awww = ngAudio.load("sound/awww.mp3"); // returns NgAudioObject
	$scope.crickets = ngAudio.load("sound/crickets.mp3"); // returns NgAudioObject
	$scope.snowballSplat = ngAudio.load("sound/snowball-splat.mp3"); // returns NgAudioObject
	$scope.squishFart = ngAudio.load("sound/squish-fart.mp3"); // returns NgAudioObject
	$scope.voiceOn = ngAudio.load("sound/voice_on.mp3"); // returns NgAudioObject
	$scope.voiceOff = ngAudio.load("sound/voice_off.mp3"); // returns NgAudioObject

	$scope.soundChaChing = function() { $scope.chaChing.play(); };
	$scope.soundAwww = function() { $scope.awww.play(); };
	$scope.soundCrickets = function() { $scope.crickets.play(); };
	$scope.soundSnowballSplat = function() { $scope.snowballSplat.play(); };
	$scope.soundSquishFart = function() { $scope.squishFart.play(); };
	$scope.soundVoiceOn = function() { $scope.voiceOn.play(); };
	$scope.soundVoiceOff = function() { $scope.voiceOff.play(); };

	////////////////////////////////////////
	// Layout Methods
	////////////////////////////////////////
	$scope.hideNavBar = function() {
	    document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
	};

	$scope.showNavBar = function() {
	    document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
	};

	$scope.noHeader = function() {
	    var content = document.getElementsByTagName('ion-content');
	    for (var i = 0; i < content.length; i++) {
	        if (content[i].classList.contains('has-header')) {
	            content[i].classList.toggle('has-header');
	        }
	    }
	};

	$scope.oneUser = UserService.get({user: 1});
	console.log("One User!!: " + $scope.oneUser);

	$scope.master = {};
    	$scope.demoUsername = "Jerry Rice";
	$scope.maxScoreList = [{
	    text: "5 Points",
	    value: "5"
	}, {
	    text: "10 Points",
	    value: "10"
	}, {
	    text: "15 Points",
	    value: "15"
	}];

	$scope.secondsRemainingList = [{
	    text: "60 seconds",
	    value: "60"
	}, {
	    text: "90 seconds",
	    value: "90"
	}, {
	    text: "120 seconds",
	    value: "120"
	}];

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
	};


	// UserService.save({name: 'Saimon', email: 'saimon@devdactic.com'});
	// // UserService.update({user: 1}, {name: 'Saimon', email: 'saimon@devdactic.com'});
	// // UserService.update({user: 1, name: 'Saimon', email: 'saimon@devdactic.com'}, {});

	// var query = UserService.query();
	// query.$promise.then(function(data) {
	//     $scope.users = data;
	//     // Do whatever when the request is finished
	// });



})

// .controller('DeviceController', function($ionicPlatform, $scope, $cordovaDevice) {
//     $ionicPlatform.ready(function() {
//         $scope.$apply(function() {
//             // sometimes binding does not work! :/
 
//             // getting device infor from $cordovaDevice
//             var device = $cordovaDevice.getDevice();
 
//             $scope.manufacturer = device.manufacturer;
//             $scope.model = device.model;
//             $scope.platform = device.platform;
//             $scope.uuid = device.uuid;
 
//         });
 
//     });
// })

//.controller('UserController', function(GameService {})



.controller('IntroController', function ($scope, $state, $ionicSlideBoxDelegate) {

  // Called to navigate to the main app
  $scope.startApp = function () {
    $state.go('app.game');
  };
  $scope.next = function () {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function () {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function (index) {
    $scope.slideIndex = index;
  };
})


.controller('GameController', function($scope, $state, $ionicTabsDelegate, $rootScope, $ionicModal, $timeout, $ionicPopup, $timeout, $ionicLoading, ModalService, TeamService, PlayerService, CardService, DealerService, GameService, CountdownService) {
  
  $scope.showLoading = function() {
    $ionicLoading.show();
  }; $scope.showLoading();

  $scope.shouldShowDelete = false;
  $scope.shouldShowReorder = false;
  $scope.listCanSwipe = true

    var game = this;

        /**
         * Our game can have multiple states:
         * 1) Game with no player (started = false, canDeal = false, showResults = false)
         * 2) Game with a player, nothing dealt (started = true, canDeal = true, showResults = false)
         * 3) Game with a player, game in progress (started = true, canDeal = false, showResults = false)
         * 4) Game with a player, game over (started = true, canDeal = true, showResults = true)
         */

        /**
         * Initialize our controller data
         */
        game.init = function () {
          game.turn = -3;
	    game.step = 0;
	    game.maxScore = GameService.maxScore();
	    game.secondsRemaining = GameService.secondsRemaining();
	    game.canDeal = false;
	    game.started = false;
	    game.showResults = false;
	    //game.deck = CardService.newDeck();
	    //game.dealer = DealerService.newDealer(game.deck);
	    game.playerCards = [];
	    game.players = [];
	    game.activePlayer = [];
	    game.teams = [];
	    game.demoMakePlayers();
	    game.demoMakeTeams();
	    //game.createPlayers();
	    //game.createTeams();
        };

          game.createPlayers = function() {

		    game.turn = -3;
		    $scope.newPlayer();

		    // if (game.players.length <= 4) {
		    // 	  console.log(game.players.length);
		    //     $scope.newPlayer();
		    // } else {
		    //   $(".next-step").removeClass("hidden").addClass("visible");
		    //   $scope.newPlayer();
		    // }

		    //game.createTeams();
	  };

	  game.nextStep = function() {
	  	game.step += 1;
	  };

	 game.nextTurn= function() {
	 	console.log("nextTurn called. current game.turn:" + game.turn);
	  	
	  	game.turn += 1;
	  	
	  	var turn = game.turn;
	  	console.log("New game.turn: " + game.turn);
	  	
	  	game.getActivePlayer(turn);
	  };

	  game.readyNextTurn = function() {
	  	console.log("ready next turn called.");
	  	$scope.closeModal();
	  };


        game.startNewGame = function () {
            //game.player = PlayerService.newPlayer('Ringo', 100);
            //console.log(game.player);
            game.started = true;
            game.canDeal = true;
            game.showResults = false;
        };

        $scope.newCountdown = function() {
	    ModalService
	      .init('timer.html', $scope)
	      .then(function(modal) {
	        modal.show();
	      });
	  };

	   $scope.showSuccess = function() {
	    ModalService
	      .init('successMessage.html', $scope)
	      .then(function(modal) {
	        modal.show();
	      });
	  };

	  $scope.showTimeExpired = function() {
	    ModalService
	      .init('timeExpiredMessage.html', $scope)
	      .then(function(modal) {
	        modal.show();
	      });
	  };

	  $scope.newPlayer = function() {
	    ModalService
	      .init('newPlayer.html', $scope)
	      .then(function(modal) {
	        modal.show();
	      });
	  };

	  
	  $scope.showLogin = function() {
	    ModalService
	      .init('login.html')
	      .then(function(modal) {
	        modal.show();
	      });
	  };
	  

	  $scope.selectTabWithIndex = function(index) {
	    $ionicTabsDelegate.select(index);
	  };

	$scope.addNewPlayer = function(playerName) {
		console.log("game.addNewPlayer() was called...");
		var newPlayer = PlayerService.newPlayer(playerName);
		console.log(newPlayer);
		game.players.push(angular.extend({}, newPlayer));
		$scope.players = angular.copy(game.players);
		//$scope.player = game.players[0];
		console.log(game.players[0].name);
		console.log($scope.players);

		// $scope.err = null;
		// var newPlayer = PlayerService.newPlayer(playerName);
		// $scope.players.push(angular.extend({}, newPlayer))
		
		// console.log("game.addNewPlayer() was called...");
		// var newPlayer = PlayerService.newPlayer(playerName);
		// console.log(newPlayer);
		// game.players.push(angular.extend({}, newPlayer));
		// $scope.players = angular.copy(game.players);
		// console.log(game.players[0].name);
		// console.log($scope.players);

		// .then(function( /* user */ ) {
		//     $scope.modal.remove();
		// }, function(err) {
		//     $scope.err = errMessage(err);
		// });


		//$scope.closeModal();
		$scope.modal.remove();
	};
// $scope.$on('$ionicView.enter', function(e) {
 
//  });

	game.demoMakePlayers = function() {
		console.log("game.demoMakePlayers() was called...");
		var p1 = PlayerService.newPlayer("Randy Jackson");
		game.players.push(angular.extend({}, p1));
		
		var p2 = PlayerService.newPlayer("Bert Rynolds");
		game.players.push(angular.extend({}, p2));
		
		var p3 = PlayerService.newPlayer("Sandra Bullock");
		game.players.push(angular.extend({}, p3));
		
		var p4 = PlayerService.newPlayer("Tim Taylor");
		game.players.push(angular.extend({}, p4));
		
		$scope.players = angular.copy(game.players);
		//$scope.player = game.players[0];
		//console.log(game.players[0].name);
		//console.log($scope.players);


		//PlayerService.logInfo();
		// p1.PlayerService.changeScore(5);
		// p2.PlayerService.logInfo();
		// p4.PlayerService.logInfo();


	};


	game.demoMakeTeams = function() {
		console.log("game.demoMakeTeams() was called...");
		var gp0 = game.players[0];
		var gp1 = game.players[1];
		var gp2 = game.players[2];
		var gp3 = game.players[3];

		
		var team1 = TeamService.newTeam("Blue Team", [gp0, gp2]);

		game.teams.push(angular.extend({}, team1));

		var team2 = TeamService.newTeam("Red Team", [gp3, gp1]);

		game.teams.push(angular.extend({}, team2));
		//var object = angular.merge({}, object1, object2)

		$scope.teams = game.teams;


		// var at = 0; //active team
		// var ap = 0;  //active player

		// function playerSequence() {
		// 	if (game.teams.length === at ) {
		// 		at = 0;
		// 	}
		// 	if (game.teams.players.length === ap ) {
		// 		ap = 0;
		// 	}
		// 	game.activePlayer = game.teams[at].players[ap];
		// 	console.log(game.activePlayer);
		// 	nextPlayer(); 
		// }

		// function nextPlayer() {
		// 	at ++;
		// 	ap ++;
		// }
	       
	 //       playerSequence();
	      
		


 		for (var i = 0; i < game.teams.length; i++) {
	        var t = game.teams[i];
	      }

	      for (var n = 0; n < t.players.length; n++) {
	        var p = t.players[n];
	       // console.log("playerName: " + p.name + "playerScore: " + p.score);
	      }


	     console.log( p);
	      //console.log(t.players[0].name);
	      //console.log("playerName: " + p.name + "playerScore: " + p.score);

		//console.log(game.teams[0].players[0].name);
		//console.log(game.teams[1].players[0].name);

		
			//var team1Score = TeamService.totalScore(team1);
			//console.log(team1Score);
	};


	/**
	* DragPlayers to make Teams
	*
	*
	**/
	 $scope.centerAnchor = true;
        $scope.toggleCenterAnchor = function () {$scope.centerAnchor = !$scope.centerAnchor}

        $scope.unassignedPlayers = $scope.players;
        $scope.droppedObjects1 = [];
        $scope.droppedObjects2= [];

        $scope.onDropComplete1=function(data,evt){
            var index = $scope.droppedObjects1.indexOf(data);
            var player = $scope.unassignedPlayers.indexOf(data);

            if (index == -1) {
              $scope.droppedObjects1.push(data); 
            }
            if (player > -1) {
              $scope.unassignedPlayers.splice(player, 1);
            }
        }
        $scope.onDragSuccess1=function(data,evt){
            console.log("133","$scope","onDragSuccess1", "", evt);
            var index = $scope.droppedObjects1.indexOf(data);
            if (index > -1) {
                $scope.droppedObjects1.splice(index, 1);
            }
        }
        $scope.onDragSuccess2=function(data,evt){
            var index = $scope.droppedObjects2.indexOf(data);
            
            if (index > -1) {
                $scope.droppedObjects2.splice(index, 1);
                
            }
        }
        $scope.onDropComplete2=function(data,evt){
            var index = $scope.droppedObjects2.indexOf(data);
            var player = $scope.unassignedPlayers.indexOf(data);

            if (index == -1) {
                $scope.droppedObjects2.push(data);
            }
          
            if (player > -1) {
              $scope.unassignedPlayers.splice(player, 1);
            }

        }

        var inArray = function(array, player) {
            var index = array.indexOf(player);
        }


	$scope.team1 = {
	    name: 'The Goodguys'
	};

	$scope.team2 = {
	    name: 'The Badguys'
	};

	
	game.getActivePlayer = function(turn) {
		if (game.turn === 1 ) {
			game.activePlayer = game.teams[0].players[0];
			game.activePlayer.isActive = true;
			console.log("from game.getActivePlayer() " + game.activePlayer);
			return game.activePlayer;
		}

		if (game.turn === 2 ) {
			game.activePlayer = game.teams[1].players[0];
			game.activePlayer.isActive = true;
			console.log(game.activePlayer);
			return game.activePlayer;
		}

		if (game.turn === 3 ) {
			game.activePlayer = game.teams[0].players[1];
			game.activePlayer.isActive = true;
			console.log(game.activePlayer);
			return game.activePlayer;
		}

		if (game.turn === 4 ) {
			game.activePlayer = game.teams[1].players[1];
			game.activePlayer.isActive = true;
			console.log(game.activePlayer);
			return game.activePlayer;
		}

		if (game.turn === 5 ) {
			game.activePlayer = game.teams[0].players[0];
			game.activePlayer.isActive = true;
			console.log(game.activePlayer);
			return game.activePlayer;
		}

		if (game.turn === 6 ) {
			game.activePlayer = game.teams[1].players[0];
			console.log(game.activePlayer);
			return game.activePlayer;
		}
	};
	

	/**
	* Global CountdownService watch function 
	*
	*
	**/
	$scope.CountdownService = CountdownService;

	$scope.setFalseTag = function() {
	    CountdownService.setFalseTag();
	};

	$scope.setTrueTag = function() {
	    CountdownService.setTrueTag();
	};

	$scope.$watch(function() {
	      return CountdownService.tags;
	    	},
	    
	    	function(newVal, oldVal) {
			console.log(newVal.a);
			console.log(oldVal);
			if (newVal.a === true) {
			    $scope.newCountdown();
			    $scope.selectTimer(2);
			}

	 }, true);


	/**
	* SVG-Countdown timer 
	*
	*
	**/
	var mytimeout = null; // the current timeoutID
	// actual timer method, counts down every second, stops on zero
	$scope.onTimeout = function() {
	    if ($scope.timer === 0) {
	        $scope.$broadcast('timer-stopped', 0);
	        $timeout.cancel(mytimeout);
	        return;
	    }
	    $scope.timer--;
	    mytimeout = $timeout($scope.onTimeout, 1000);
	};
	// functions to control the timer
	// starts the timer
	$scope.startTimer = function() {
	    mytimeout = $timeout($scope.onTimeout, 1000);
	    $scope.started = true;
	};

	// stops and resets the current timer
	$scope.stopTimer = function(closingModal) {
	    if (closingModal != true) {
	        $scope.$broadcast('timer-stopped', $scope.timer);
	    }
	    $scope.timer = $scope.timeForTimer;
	    $scope.started = false;
	    $scope.paused = false;
	    $timeout.cancel(mytimeout);
	};
	// pauses the timer
	$scope.pauseTimer = function() {
	    $scope.$broadcast('timer-stopped', $scope.timer);
	    $scope.started = false;
	    $scope.paused = true;
	    $timeout.cancel(mytimeout);
	};

	// triggered, when the timer stops, you can do something here, maybe show a visual indicator or vibrate the device
	$scope.$on('timer-stopped', function(event, remaining) {
	    if (remaining === 0) {
	        $scope.done = true;
	        console.log("out of time!");
	        $scope.closeModal();
	        $scope.showTimeExpired();
	    }
	});
	// UI
	// When you press a timer button this function is called
	$scope.selectTimer = function(val) {
	    $scope.timeForTimer = val;
	    $scope.timer = val
	    $scope.started = false;
	    $scope.paused = false;
	    $scope.done = false;
	};

	// This function helps to display the time in a correct way in the center of the timer
	$scope.humanizeDurationTimer = function(input, units) {
	    // units is a string with possible values of y, M, w, d, h, m, s, ms
	    if (input == 0) {
	        return 0;
	    } else {
	        var duration = moment().startOf('day').add(input, units);
	        var format = "";
	        if (duration.hour() > 0) {
	            format += "H[h] ";
	        }
	        if (duration.minute() > 0) {
	            format += "m[m] ";
	        }
	        if (duration.second() > 0) {
	            format += "s[s] ";
	        }
	        return duration.format(format);
	    }
	};

	/* angular-svg-round-progressbar@0.3.8 2015-10-21 */
	"use strict";!function(){for(var a=0,b=["webkit","moz"],c=0;c<b.length&&!window.requestAnimationFrame;++c)window.requestAnimationFrame=window[b[c]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[b[c]+"CancelAnimationFrame"]||window[b[c]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(b){var c=(new Date).getTime(),d=Math.max(0,16-(c-a)),e=window.setTimeout(function(){b(c+d)},d);return a=c+d,e}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(a){window.clearTimeout(a)})}(),angular.module("angular-svg-round-progress",[]),angular.module("angular-svg-round-progress").constant("roundProgressConfig",{max:50,semi:!1,rounded:!1,responsive:!1,clockwise:!0,radius:100,color:"#45ccce",bgcolor:"#eaeaea",stroke:15,duration:800,animation:"easeOutCubic",offset:0}),angular.module("angular-svg-round-progress").service("roundProgressService",[function(){var a={},b=angular.isNumber,c=document.head.querySelector("base");a.resolveColor=c&&c.href?function(a){var b=a.indexOf("#");return b>-1&&a.indexOf("url")>-1?a.slice(0,b)+window.location.href+a.slice(b):a}:function(a){return a},a.isSupported=!(!document.createElementNS||!document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect);var d=function(a,b,c,d){var e=(d-90)*Math.PI/180;return{x:a+c*Math.cos(e),y:b+c*Math.sin(e)}};return a.toNumber=function(a){return b(a)?a:parseFloat((a+"").replace(",","."))},a.getOffset=function(b,c){var d=+c.offset||0;if("inherit"===c.offset)for(var e,f=b;!f.hasClass("round-progress-wrapper");)a.isDirective(f)&&(e=f.scope().$parent.getOptions(),d+=(+e.offset||0)+(+e.stroke||0)),f=f.parent();return d},a.updateState=function(a,b,c,e,f,g){if(!f)return e;var h=a>0?Math.min(a,b):0,i=g?180:359.9999,j=0===b?0:h/b*i,k=f/2,l=d(k,k,c,j),m=d(k,k,c,0),n=180>=j?"0":"1",o=["M",l.x,l.y,"A",c,c,0,n,0,m.x,m.y].join(" ");return e.attr("d",o)},a.isDirective=function(a){return a&&a.length?"undefined"!=typeof a.attr("round-progress")||"round-progress"===a[0].nodeName.toLowerCase():!1},a.animations={linearEase:function(a,b,c,d){return c*a/d+b},easeInQuad:function(a,b,c,d){return c*(a/=d)*a+b},easeOutQuad:function(a,b,c,d){return-c*(a/=d)*(a-2)+b},easeInOutQuad:function(a,b,c,d){return(a/=d/2)<1?c/2*a*a+b:-c/2*(--a*(a-2)-1)+b},easeInCubic:function(a,b,c,d){return c*(a/=d)*a*a+b},easeOutCubic:function(a,b,c,d){return c*((a=a/d-1)*a*a+1)+b},easeInOutCubic:function(a,b,c,d){return(a/=d/2)<1?c/2*a*a*a+b:c/2*((a-=2)*a*a+2)+b},easeInQuart:function(a,b,c,d){return c*(a/=d)*a*a*a+b},easeOutQuart:function(a,b,c,d){return-c*((a=a/d-1)*a*a*a-1)+b},easeInOutQuart:function(a,b,c,d){return(a/=d/2)<1?c/2*a*a*a*a+b:-c/2*((a-=2)*a*a*a-2)+b},easeInQuint:function(a,b,c,d){return c*(a/=d)*a*a*a*a+b},easeOutQuint:function(a,b,c,d){return c*((a=a/d-1)*a*a*a*a+1)+b},easeInOutQuint:function(a,b,c,d){return(a/=d/2)<1?c/2*a*a*a*a*a+b:c/2*((a-=2)*a*a*a*a+2)+b},easeInSine:function(a,b,c,d){return-c*Math.cos(a/d*(Math.PI/2))+c+b},easeOutSine:function(a,b,c,d){return c*Math.sin(a/d*(Math.PI/2))+b},easeInOutSine:function(a,b,c,d){return-c/2*(Math.cos(Math.PI*a/d)-1)+b},easeInExpo:function(a,b,c,d){return 0==a?b:c*Math.pow(2,10*(a/d-1))+b},easeOutExpo:function(a,b,c,d){return a==d?b+c:c*(-Math.pow(2,-10*a/d)+1)+b},easeInOutExpo:function(a,b,c,d){return 0==a?b:a==d?b+c:(a/=d/2)<1?c/2*Math.pow(2,10*(a-1))+b:c/2*(-Math.pow(2,-10*--a)+2)+b},easeInCirc:function(a,b,c,d){return-c*(Math.sqrt(1-(a/=d)*a)-1)+b},easeOutCirc:function(a,b,c,d){return c*Math.sqrt(1-(a=a/d-1)*a)+b},easeInOutCirc:function(a,b,c,d){return(a/=d/2)<1?-c/2*(Math.sqrt(1-a*a)-1)+b:c/2*(Math.sqrt(1-(a-=2)*a)+1)+b},easeInElastic:function(a,b,c,d){var e=1.70158,f=0,g=c;return 0==a?b:1==(a/=d)?b+c:(f||(f=.3*d),g<Math.abs(c)?(g=c,e=f/4):e=f/(2*Math.PI)*Math.asin(c/g),-(g*Math.pow(2,10*(a-=1))*Math.sin((a*d-e)*(2*Math.PI)/f))+b)},easeOutElastic:function(a,b,c,d){var e=1.70158,f=0,g=c;return 0==a?b:1==(a/=d)?b+c:(f||(f=.3*d),g<Math.abs(c)?(g=c,e=f/4):e=f/(2*Math.PI)*Math.asin(c/g),g*Math.pow(2,-10*a)*Math.sin((a*d-e)*(2*Math.PI)/f)+c+b)},easeInOutElastic:function(a,b,c,d){var e=1.70158,f=0,g=c;return 0==a?b:2==(a/=d/2)?b+c:(f||(f=d*(.3*1.5)),g<Math.abs(c)?(g=c,e=f/4):e=f/(2*Math.PI)*Math.asin(c/g),1>a?-.5*(g*Math.pow(2,10*(a-=1))*Math.sin((a*d-e)*(2*Math.PI)/f))+b:g*Math.pow(2,-10*(a-=1))*Math.sin((a*d-e)*(2*Math.PI)/f)*.5+c+b)},easeInBack:function(a,b,c,d,e){return void 0==e&&(e=1.70158),c*(a/=d)*a*((e+1)*a-e)+b},easeOutBack:function(a,b,c,d,e){return void 0==e&&(e=1.70158),c*((a=a/d-1)*a*((e+1)*a+e)+1)+b},easeInOutBack:function(a,b,c,d,e){return void 0==e&&(e=1.70158),(a/=d/2)<1?c/2*(a*a*(((e*=1.525)+1)*a-e))+b:c/2*((a-=2)*a*(((e*=1.525)+1)*a+e)+2)+b},easeInBounce:function(b,c,d,e){return d-a.animations.easeOutBounce(e-b,0,d,e)+c},easeOutBounce:function(a,b,c,d){return(a/=d)<1/2.75?c*(7.5625*a*a)+b:2/2.75>a?c*(7.5625*(a-=1.5/2.75)*a+.75)+b:2.5/2.75>a?c*(7.5625*(a-=2.25/2.75)*a+.9375)+b:c*(7.5625*(a-=2.625/2.75)*a+.984375)+b},easeInOutBounce:function(b,c,d,e){return e/2>b?.5*a.animations.easeInBounce(2*b,0,d,e)+c:.5*a.animations.easeOutBounce(2*b-e,0,d,e)+.5*d+c}},a}]),angular.module("angular-svg-round-progress").directive("roundProgress",["$window","roundProgressService","roundProgressConfig",function(a,b,c){var d={restrict:"EA",replace:!0,transclude:!0,scope:{current:"=",max:"=",semi:"=",rounded:"=",clockwise:"=",responsive:"=",radius:"@",color:"@",bgcolor:"@",stroke:"@",duration:"@",animation:"@",offset:"@"}};return b.isSupported?angular.extend(d,{link:function(e,f){var g,h,i=!f.hasClass("round-progress-wrapper"),j=i?f:f.find("svg").eq(0),k=j.find("path").eq(0),l=j.find("circle").eq(0),m=angular.copy(c);e.getOptions=function(){return m};var n=function(){var a=m.semi,c=m.responsive,d=+m.radius||0,e=+m.stroke,g=2*d,h=d-e/2-b.getOffset(f,m);j.css({top:0,left:0,position:c?"absolute":"static",width:c?"100%":g+"px",height:c?"100%":(a?d:g)+"px",overflow:"hidden"}),i||(j[0].setAttribute("viewBox","0 0 "+g+" "+(a?d:g)),f.css({width:c?"100%":"auto",position:"relative","padding-bottom":c?a?"50%":"100%":0})),f.css({width:c?"100%":"auto",position:"relative","padding-bottom":c?a?"50%":"100%":0}),k.css({stroke:b.resolveColor(m.color),"stroke-width":e,"stroke-linecap":m.rounded?"round":"butt"}),a?k.attr("transform",m.clockwise?"translate(0,"+g+") rotate(-90)":"translate("+g+", "+g+") rotate(90) scale(-1, 1)"):k.attr("transform",m.clockwise?"":"scale(-1, 1) translate("+-g+" 0)"),l.attr({cx:d,cy:d,r:h>=0?h:0}).css({stroke:b.resolveColor(m.bgcolor),"stroke-width":e})},o=function(c,d,e){var h=b.toNumber(m.max||0),i=c>0?a.Math.min(c,h):0,j=d===i||0>d?0:d||0,l=i-j,n=b.animations[m.animation],o=new a.Date,p=+m.duration||0,q=e||c>h&&d>h||0>c&&0>d||25>p,r=m.radius,s=r-m.stroke/2-b.getOffset(f,m),t=2*r,u=m.semi;q?b.updateState(i,h,s,k,t,u):(a.cancelAnimationFrame(g),function v(){var c=a.Math.min(new Date-o,p);b.updateState(n(c,j,l,p),h,s,k,t,u),p>c&&(g=a.requestAnimationFrame(v))}())},p=Object.keys(d.scope).filter(function(a){return"current"!==a});e.$watchGroup(p,function(a){for(var b=0;b<a.length;b++)"undefined"!=typeof a[b]&&(m[p[b]]=a[b]);n(),e.$broadcast("$parentOffsetChanged"),"inherit"!==m.offset||h?"inherit"!==m.offset&&h&&h():h=e.$on("$parentOffsetChanged",function(){o(e.current,e.current,!0),n()})}),e.$watchGroup(["current","max","animation","duration","radius","stroke","semi","offset"],function(a,c){o(b.toNumber(a[0]),b.toNumber(c[0]))})},template:function(a){for(var c=a.parent(),d="round-progress",e=['<svg class="'+d+'" xmlns="http://www.w3.org/2000/svg">','<circle fill="none"/>','<path fill="none"/>',"<g ng-transclude></g>","</svg>"];c.length&&!b.isDirective(c);)c=c.parent();return c&&c.length||(e.unshift('<div class="round-progress-wrapper">'),e.push("</div>")),e.join("\n")}}):angular.extend(d,{template:'<div class="round-progress" ng-transclude></div>'})}])

	game.startBonousRound = function() {

	};






	game.init();

	$scope.hideLoading = function() {
	    $timeout(function() {
	        $ionicLoading.hide();
	    }, 1000);
	};

	$scope.hideLoading();
}) ///    END GAME CONTROLLER   ///




.controller('PlayerController', function($scope) {})
// .controller('CardsController', function($scope) {})
.controller('CardCtrl', function($scope) {})

.controller('CardsController', ['$scope', '$window', '$interval', '$timeout', '$ionicModal', '$ionicLoading', '$http', 'PlayerService', 'CardService', 'ModalService', 'CountdownService',
  function($scope, $window, $interval, $timeout, $ionicModal, $ionicLoading, $http, PlayerService, CardService, ModalService, CountdownService) {

  var cardTypes = CardService.all();

  $scope.oneCard = CardService.oneCard();

  $scope.cards = {
    master: cardTypes,
    active: [],
    activeCard: [],
    discards: [],
  };

  $scope.playerCards = {};

  $scope.reload = function(){
    CardService.reload();
  };

  $scope.cardsControl = {};

  $scope.cardDestroyed = function(index) {
    $scope.cards.master.splice(index, 1);
  };

  $scope.deal = function() {
  	$scope.hideCards = true;
  	$scope.refreshCards();
  }

  $scope.addCard = function() {
    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    newCard.id = Math.random();
    $scope.cards.active.push(angular.extend({}, newCard));
  };

  $scope.refreshCards = function() {
    // Set $scope.cards to null so that directive reloads
    $scope.cards.active = null;
    $timeout(function() {
      $scope.cards.active = Array.prototype.slice.call($scope.cards.master, 0);
    });
  };


	$scope.cardSwipedUp = function(index) {
	    console.log('UP SWIPE');
	    $scope.activateCard(index);
	    CountdownService.setTrueTag();
	    $("td-card").addClass("hidden");
	};

	$scope.cardSwipedLeft = function(index) {
	    console.log('LEFT SWIPE');
	    //$scope.addCard();
	     $scope.cardDestroyed(index);
	};

	$scope.cardSwipedRight = function(index) {
	    console.log('RIGHT SWIPE');
	    //$scope.addCard();
	    $scope.cardDestroyed(index);
	};

	$scope.activateCard = function(index) {
		//console.log("activeCard index: " + index);
	    $scope.cards.master.splice(index, 1);
	    $scope.cards.activeCard.push(angular.extend({}, index));
	    console.log($scope.cards.activeCard);
	    $("td-card").addClass("hidden");
	    var activeCard = CardService.activeCard(index);
	    console.log(activeCard);
	 };

	$scope.deActivateCard = function(index) {
	    $scope.cards.activeCard.splice(index, 1);
	    $scope.cardDestroyed(index);
	    console.log($scope.cards.activeCard);
	};

	  $scope.$on('removeCard', function(event, element, card) {
	    var discarded = $scope.cards.master.splice($scope.cards.master.indexOf(card), 1);
	    $scope.cards.discards.push(discarded);
	  });


  $scope.showAlt = false;


  // $scope.onDragDown = function(index){
  //   console.log("... you are dragging the card!");
  // };

  // $scope.onTap = function() {
  //   console.log("Tapped!");
  //   $(td-card).addClass("no-shadow");
  // };

  $scope.onDoubleTap = function() {
    console.log("Double-Tapped!");
  };

  // $scope.onHold = function(){
  //   console.log("onHold just happened!");
  //   $(td-card).addClass("without-shadow");
  // };


 //$scope.reload();
}])


.controller('CardController', function($scope, $timeout, CardService) {

  var vm = this;

  vm.phrase;
  vm.altPhrase;

  vm.init = function(){
      vm.showAltPhrase = false;
      //vm.displayCard();

      $scope.$watchCollection('vm.card',function(newC,oldC){
          vm.displayCard();
      });
  };

  vm.displayCard = function(){
    console.log("vm.displayCard was just called");

          vm.card = CardService.first();
     
          vm.phrase = vm.card.phrase;
          vm.altPhrase = vm.card.altPhrase;
  };

  vm.nextCard = function() {
      CardService.nextCard();
  };

  vm.togglePhrases = function() {
      vm.showAltPhrase === false ? true: false;
      console.log(vm.showAltPhrase);
  };

  vm.showAltPhrase = function() {
    vm.showAltPhrase = false;
    console.log(vm.showAltPhrase);
  };

  vm.showPhrase = function() {
    card.showAltPhrase = true;
    console.log(card.showAltPhrase);
  };


  vm.init();
})


