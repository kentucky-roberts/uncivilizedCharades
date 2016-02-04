angular
  .module('app.game')
    .controller('GameController', GameController);

GameController.$inject = ['$scope', '$rootScope', '$firebaseAuth', '$window', '$interval', '$timeout', '$ionicModal', '$ionicLoading', '$ionicSideMenuDelegate', '$state', '$ionicSlideBoxDelegate', '$http', '$ionicTabsDelegate', '$ionicPlatform', '$firebaseObject', 'ngAudio', 'ionicToast', '$ionicNavBarDelegate', 'PlayerService', 'CardService', 'ModalService', 'CountdownService', 'DealerService', 'TeamService', 'AppService', 'GameService', 'Games', '$log', 'CardType'];
function GameController($scope, $rootScope, $firebaseAuth, $window, $interval, $timeout, $ionicModal, $ionicLoading, $ionicSideMenuDelegate, $state, $ionicSlideBoxDelegate, $http, $ionicTabsDelegate, $ionicPlatform, $firebaseObject, ngAudio, ionicToast, $ionicNavBarDelegate, PlayerService, CardService, ModalService, CountdownService, DealerService, TeamService, AppService, GameService, Games, $log, CardType) {
  $scope.showLoading = function() {
    $ionicLoading.show();
  }; $scope.showLoading();

    $scope.filterFunction = function(element) {
    return element.name.match(/^Ma/) ? true : false;
    };

    // var navIcons = document.getElementsByClassName('ion-navicon');
    // for (var i = 0; i < navIcons.length; i++) {
    //     navIcons.addEventListener('click', function() {
    //         this.classList.toggle('active');
    //     });
    // }

    // var cbuttons = document.getElementsByClassName('.cbutton.cbutton--effect-novak');
    // for (var i = 0; i < cbuttons.length; i++) {
    //     cbuttons.addEventListener('click', function() {
    //         this.classList.toggle('.cbutton--click');
    //     });
    // }

    // var gameMessages =
    // $http.get('api/game_text.json').then(function(gameMessageData){
    //     game.messages = gameMessageData.data;
    //     game.totalMessages = game.messages.length;
    // });


    // $scope.gameMessages = gameMessages;
    // console.log("gameMEssages: " + gameMessages);



      var game = this;
      var quiz = this;
      game.debugging = false;

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
	$scope.clickOn = ngAudio.load("sound/click-on.mp3"); // returns NgAudioObject
	$scope.clickOff = ngAudio.load("sound/click-off.mp3"); // returns NgAudioObject

	$scope.soundChaChing = function() { $scope.chaChing.play(); };
	$scope.soundAwww = function() { $scope.awww.play(); };
	$scope.soundCrickets = function() { $scope.crickets.play(); };
	$scope.soundSnowballSplat = function() { $scope.snowballSplat.play(); };
	$scope.soundSquishFart = function() { $scope.squishFart.play(); };
	$scope.soundVoiceOn = function() { $scope.voiceOn.play(); };
	$scope.soundVoiceOff = function() { $scope.voiceOff.play(); };
	$scope.soundClickOn = function() { $scope.clickOn.play(); };
	$scope.soundClickOff = function() { $scope.clickOff.play(); };




	// $scope.animatePlayer = function() {
	// 	 // $(".player-avatar").removeClass("slideInLeft");
	// 	 // $(".player-avatar").addClass("slideOutRight");
	// };
      $scope.hasHeaderFabLeft = false;
      $scope.hasHeaderFabRight = false;

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
        game.maxTurnCount = 100;
        game.turn = -1;
        game.step = -1;
        game.activePlayer = -1;
        game.maxScore = GameService.maxScore();
        game.secondsRemaining = GameService.maxTime();
        game.canDeal = false;
        game.started = false;
        game.showResults = false;
        //game.deck = CardService.newDeck();  //new
        game.dealer = DealerService.newDealer(game.deck);  //new
        game.playerCards = [];  //new
        game.players = [];
        game.teams = [];
        game.team1Score = 0;
        game.team2Score = 0;

        game.readyForTeams = false;

        game.needsPlayers = true;

        game.activeTeam = "Team1";
        game.nextActiveTeam = "Team2";
        game.activeTeamColor = "yellow-text";


        game.cardsVisible = false;

    	game.winningTeamName = "FreeAgent";

    	game.showLoadGameButton = false;  // main-menu buttons will appear when true
    	game.showSavedGame = false;  // main-menu buttons will appear when true
    	game.showSavedGames = false; //main-menu button appear when true -> list a users saved games to Load.



        //game.deck = CardService.newDeck();
        //game.dealer = DealerService.newDealer(game.deck);
        //game.players = AppService.availablePlayers();
        // console.log(game.players);
        // game.activePlayerCount = 0;
        // game.activePlayer = game.players[game.activePlayerCount];


         //game.demoMakePlayers();
         //game.players = PlayerService.getPlayers();

         //game.demoMakeTeams();
        //game.createPlayers();
        //game.createTeams();
          };


      game.showBuildTeams = function() {
        	game.readyForTeams = true;
        };



	game.loadGame = function() {

	};
	game.listSavedGames = function() {

	};

	game.restartGame = function() {
		alert("Restart the Game!");
	};



// $scope.addSlide = function() {
//     var newSlide = "hello";
//     console.log(newSlide);
// };


// for (var i = 0; i < 10; i++) {
//     $scope.addSlide();
// }





      ////////////////////////////////////////
      // Toast
      ////////////////////////////////////////
      $scope.showToast = function() {
          <!-- ionicToast.show(message, position, stick, time); -->
          ionicToast.show('This is a toast at the top.', 'top', true, 2500);
      };

      ////////////////////////////////////////
      // ModalService
      ////////////////////////////////////////
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

      $scope.showLogin = function() {
          ModalService
              .init('templates/modals/login-user.html')
              .then(function(modal) {
                  modal.show();
              });
      };

	$scope.saveGame = function() {
		console.log("saveGame!");
	};

      $scope.team1 = {
          name: "Goodguys"
      };

      $scope.team2 = {
          name: "Badguys"
      };


      /**
       * DragPlayers to make Teams
       *
       *
       **/
      $scope.centerAnchor = true;
      $scope.toggleCenterAnchor = function() {
          $scope.centerAnchor = !$scope.centerAnchor
      }
      $scope.droppedObjects1 = [];
      $scope.droppedObjects2 = [];

      $scope.onDropComplete1 = function(data, evt) {
          var index = $scope.droppedObjects1.indexOf(data);
          var player = $scope.players.indexOf(data);
          console.log(data);

          game.joinTeam1(player);
          $scope.soundClickOn();

          if (index == -1) {
              $scope.droppedObjects1.push(data);

          }
          if (player > -1) {
              $scope.players.splice(player, 1);
          }
      }
      $scope.onDragSuccess1 = function(data, evt) {

          var index = $scope.droppedObjects1.indexOf(data);
          console.log(index);

          if (index > -1) {
              $scope.droppedObjects1.splice(index, 1);
          }
      }
      $scope.onDragSuccess2 = function(data, evt) {
          var index = $scope.droppedObjects2.indexOf(data);
          console.log(index);

          if (index > -1) {
              $scope.droppedObjects2.splice(index, 1);
          }
      }
      $scope.onDropComplete2 = function(data, evt) {
          var index = $scope.droppedObjects2.indexOf(data);
          var player = $scope.players.indexOf(data);
          $scope.soundClickOn();

          game.joinTeam2(player);

          if (index == -1) {
              $scope.droppedObjects2.push(data);
          }

          if (player > -1) {
              $scope.players.splice(player, 1);
          }

      }

      var inArray = function(array, player) {
          var index = array.indexOf(player);
      }

	game.joinTeam1 = function(index) {
		game.players[index].team = "Team 1";
		console.log("newTeam1Player.team: " + game.players[index].team );
	};
	game.joinTeam2 = function(index) {
		var newTeam2Player = game.players[index];
		newTeam2Player.team = "Team 2";
		console.log("newTeam2Player.team: " + newTeam2Player.team);
	};

	game.addPoint = function(index) {  // dev-button built to test player interaction on step 1 -> ng-repeat passes in the $index
		var activePlayer = game.players[index];
		activePlayer.score += 1;
		console.log("Add point to activePlayer.name: " + activePlayer.name + "score: " + activePlayer.score);
	};

	game.addNewPlayer = function(playerName) {
		var newPlayer = PlayerService.newPlayer(playerName);
		console.log(newPlayer);
		game.players.push(angular.extend({}, newPlayer));
            console.log("game.players: " + game.players.length);
		$scope.players = angular.copy(game.players);
		console.log("$scope.players.lenngth: " + $scope.players.length);

            $scope.closeModal();

	};



      ////////////////////////////////////////
      // ionicSlideBoxDeligate
      ////////////////////////////////////////

      $scope.next = function () {
        $ionicSlideBoxDelegate.next();
      };
      $scope.previous = function () {
        $ionicSlideBoxDelegate.previous();
      };
      // Called each time the slide changes
      $scope.slideChanged = function (index) {
        $scope.slideIndex = index;
        console.log("slideChanged: " + index);
      };



      ////////////////////////////////////////
      // Game's pre-flight
      ////////////////////////////////////////

      game.nextActivePlayer = function() {
          game.ap++;
      };

      game.lastActivePlayer = function() {
          game.ap--;
      };

      game.nextStep = function() {
          game.step += 1;
      };

      game.nextTurn = function() {
          game.started = true;
          game.canDeal = false;
          game.showResults = false;
          game.readyNextTurn = false;
          $("#readyNextTurn").removeClass("show").addClass("hidden");

          $scope.activeQuestion++;

          game.step = 1;  // 1 because it is the beginning of the card dealing cycle
          game.turn += 1;
          game.ap += 1;

         //  var apc = game.ap;
         // game.readyNextPlayer(apc);  // FIX THISSS TOMORROW



          $ionicSlideBoxDelegate.next();
          game.showDealer(); // begins the loop again
      };


	game.readyNextTurn = function() {
          game.started = true;
          game.canDeal = false;
          game.showResults = true;
          game.readyNextTurn = true;  // shows txt in view
          $("#showCountdown").removeClass("show").addClass("hidden"); // the was left open from game.showCountdown()
          $("#readyNextTurn").removeClass("hidden").addClass("show");  // shows bottom txt in view

	};



// $scope.selectActiveTeam = function() {

//     if ($scope.turn % 2 == 0 && $scope.turn != 1) {

//         $scope.activeTeam = "Team1";
//         $scope.teamColor = "positive";
//         return;

//     } else {
//         $scope.activeTeam = "Team2";
//         $scope.teamColor = "assertive";
//         return;
//     }

// };



      ////////////////////////////////////////
      // Game Has Started!!
      ////////////////////////////////////////
      game.startGame = function(players){
            game.players = players;
            console.log("game.players: " + game.players);

            game.started = true;
            game.canDeal = false;
            game.showResults = false;

            //$scope.activeQuestion++;

            game.turn = 1;
            game.step = 1;
            game.ap = 0;

            game.activePlayer = game.players[game.ap];
            console.log("game.activePlayer: " + game.activePlayer);


            // The two functions above return
            // game.step = 1;
            // game.turn = 0;
            // game.ap = 0;

            $("#pre-flight").removeClass("show").addClass("hidden");
            $("#game").removeClass("hidden").addClass("show");
            game.showDealer();

      };

      game.showDealer = function() {
            game.started = true;
            game.canDeal = false;
            game.showResults = false;
            $("#dealer").removeClass("hidden").addClass("show");
      };

      game.hideDealer = function() {
            $("#dealer").removeClass("show").addClass("hidden");
      };

      game.deal = function(){
            game.canDeal = true;
            $("#dealer").removeClass("show").addClass("hidden");
            $("#showCards").removeClass("hidden").addClass("show");
      };

      game.showCards = function(){
            game.cardsVisible = true;
           $("#showCards").removeClass("show").addClass("hidden");
            $("#activateCard").removeClass("hidden").addClass("show");
      };

      game.activateCard = function() {
          game.cardsVisible = false;
          $("#activateCard").removeClass("show").addClass("hidden");
          $("#showCountdown").removeClass("hidden").addClass("show");
         game.showCountdown();
      };

      game.showCountdown = function() {
          game.cardsVisible = false;
          $("#showCountdown").removeClass("show").addClass("hidden");
          $("#countdown").removeClass("hidden").addClass("show");
          $scope.newCountdown();
          $scope.selectTimer(2);
          // game.readyNextTurn() will go to: game.awardPoint or game.noPoint, both of which call game.readyNextTurn() which restarts loop
      };


      game.noPoint = function() {
          game.readyNextTurn();
      };

      game.awardPoint = function() {
         // var winner = game.activePlayer;
          //console.log("Winner is:" + winner + "Award him a point");
          game.readyNextTurn();
      };


     game.readyNextPlayer = function(apc) {
        //   var apc = apc;
        //  // game.turn = 1;  // readyFirstPlayer
        // // game.ap = 0;   // readyFirstPlayer
        // game.activePlayer = game.players[apc];
        //   console.log("activePlayer.name: " + game.activePlayer.name + "team: " + game.activePlayer.team + "score: " + game.activePlayer.score);
        //   console.log("ready first player!!!  " + game.activePlayer.name);
      };




      game.getTeamPoints = function(){
         // Need to return:  game.team1Points, game.team2Points,

         var team1Score = 0;
         var team2Score = 0;


          //   var deck = this;
          //   this.team1 = [];
          //   this.team2 = [];

          //   game.players.forEach(function () {

          //                    if (game.players.team == "team1") {
          //   console.log();
          // }

          //   });



         // angular.forEach(game.players, player) {
         //    console.log(player.name);
         // }

         //  if (game.players.team == "team1") {
         //    console.log();
         //  }
      };

      game.setTeam1Points = function(){
          game.team1Points = 1;
      };

      game.setTeam2Points = function(){
          game.team2Points = 1;
      };


	game.startBonusRound = function() {
		console.log("start bonus round!");
	};

	game.stealPoint = function(team) {
		alert("game.stealPoint() called from GameController yo!");
	};

	game.makeTeams = function() {
		game.step = 0;
	};

      game.showRefreshCards = function() {
          game.started = true;
          game.canDeal = true;
          game.showResults = false;
      };


 // var createGame = function(gameTitle) {

 //    var newGame = Games.newGame(gameTitle);

 //    $scope.games.push(newGame);

 //    Games.save($scope.games);

 //    $scope.selectGame(newGame, $scope.games.length - 1);

 //    $scope.closeModal();

 //  }


 //  // Load or initialize projects
 //  $scope.games = Games.all();

 //  // Grab the last active, or the first project
 //  $scope.activeGame = $scope.games[Games.getLastActiveIndex()];

 //  // Called to create a new project
 //  $scope.newGame = function(game) {
 //    //var projectTitle = prompt('Project name');
 //    var gameTitle = game.title;
 //    if(gameTitle) {
 //      createGame(gameTitle);
 //      $scope.closeModal();
 //    }
 //  };

 //  // Called to select the given project
 //  $scope.selectGame = function(game, index) {
 //    $scope.activeGame = game;
 //    Games.setLastActiveIndex(index);
 //   // $scope.sideMenuController.close();
 //   $ionicSideMenuDelegate.toggleRight();
 //  };



	/*
	game.xx = function() {

	};

	game.xx = function() {

	};
	*/
	 ////	  MODAL SERVICE    ////

	 $scope.playerModalShow = function() {
	  ModalService
	    .init('templates/modals/new-player.html', $scope)
	    .then(function(modal) {
	      modal.show();
	    });
	};

	$scope.gameModalShow = function() {
	  ModalService
	    .init('templates/modals/new-game.html', $scope)
	    .then(function(modal) {
	      modal.show();
	    });
	};

	$scope.newCountdown = function() {
	  ModalService
	    .init('templates/modals/countdown-timer.html', $scope)
	    .then(function(modal) {
	      modal.show();
	    });
	};

	 $scope.showSuccess = function() {
	  ModalService
	    .init('templates/modals/success-message.html', $scope)
	    .then(function(modal) {
	      modal.show();
	    });
	};

	$scope.showTimeExpired = function() {
	  ModalService
	    .init('templates/modals/time-expired-message.html', $scope)
	    .then(function(modal) {
	      modal.show();
	    });
	};

	////    COUNTDOWN SERVICE    ////  todo....  make CountdownService.tags -> tags more descriptive name
	$scope.CountdownService = CountdownService;

	$scope.setFalseTag = function() {
	    CountdownService.setFalseTag();
	};

	$scope.setTrueTag = function() {
	    CountdownService.setTrueTag();
	};

	$scope.setTrueTag();

	$scope.$watch(function() {
	      return CountdownService.tags;
	    	},

	    	function(newVal, oldVal) {
			console.log(newVal);
			console.log(oldVal);
			if (newVal.a === false) {
			    $scope.newCountdown();
			    $scope.selectTimer(2);
			}

	 }, true);


	/**
	*
	* SVG-Countdown timer
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

////	/* angular-svg-round-progressbar@0.3.8 2015-10-21 */
	"use strict";!function(){for(var a=0,b=["webkit","moz"],c=0;c<b.length&&!window.requestAnimationFrame;++c)window.requestAnimationFrame=window[b[c]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[b[c]+"CancelAnimationFrame"]||window[b[c]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(b){var c=(new Date).getTime(),d=Math.max(0,16-(c-a)),e=window.setTimeout(function(){b(c+d)},d);return a=c+d,e}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(a){window.clearTimeout(a)})}(),angular.module("angular-svg-round-progress",[]),angular.module("angular-svg-round-progress").constant("roundProgressConfig",{max:50,semi:!1,rounded:!1,responsive:!1,clockwise:!0,radius:100,color:"#45ccce",bgcolor:"#eaeaea",stroke:15,duration:800,animation:"easeOutCubic",offset:0}),angular.module("angular-svg-round-progress").service("roundProgressService",[function(){var a={},b=angular.isNumber,c=document.head.querySelector("base");a.resolveColor=c&&c.href?function(a){var b=a.indexOf("#");return b>-1&&a.indexOf("url")>-1?a.slice(0,b)+window.location.href+a.slice(b):a}:function(a){return a},a.isSupported=!(!document.createElementNS||!document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect);var d=function(a,b,c,d){var e=(d-90)*Math.PI/180;return{x:a+c*Math.cos(e),y:b+c*Math.sin(e)}};return a.toNumber=function(a){return b(a)?a:parseFloat((a+"").replace(",","."))},a.getOffset=function(b,c){var d=+c.offset||0;if("inherit"===c.offset)for(var e,f=b;!f.hasClass("round-progress-wrapper");)a.isDirective(f)&&(e=f.scope().$parent.getOptions(),d+=(+e.offset||0)+(+e.stroke||0)),f=f.parent();return d},a.updateState=function(a,b,c,e,f,g){if(!f)return e;var h=a>0?Math.min(a,b):0,i=g?180:359.9999,j=0===b?0:h/b*i,k=f/2,l=d(k,k,c,j),m=d(k,k,c,0),n=180>=j?"0":"1",o=["M",l.x,l.y,"A",c,c,0,n,0,m.x,m.y].join(" ");return e.attr("d",o)},a.isDirective=function(a){return a&&a.length?"undefined"!=typeof a.attr("round-progress")||"round-progress"===a[0].nodeName.toLowerCase():!1},a.animations={linearEase:function(a,b,c,d){return c*a/d+b},easeInQuad:function(a,b,c,d){return c*(a/=d)*a+b},easeOutQuad:function(a,b,c,d){return-c*(a/=d)*(a-2)+b},easeInOutQuad:function(a,b,c,d){return(a/=d/2)<1?c/2*a*a+b:-c/2*(--a*(a-2)-1)+b},easeInCubic:function(a,b,c,d){return c*(a/=d)*a*a+b},easeOutCubic:function(a,b,c,d){return c*((a=a/d-1)*a*a+1)+b},easeInOutCubic:function(a,b,c,d){return(a/=d/2)<1?c/2*a*a*a+b:c/2*((a-=2)*a*a+2)+b},easeInQuart:function(a,b,c,d){return c*(a/=d)*a*a*a+b},easeOutQuart:function(a,b,c,d){return-c*((a=a/d-1)*a*a*a-1)+b},easeInOutQuart:function(a,b,c,d){return(a/=d/2)<1?c/2*a*a*a*a+b:-c/2*((a-=2)*a*a*a-2)+b},easeInQuint:function(a,b,c,d){return c*(a/=d)*a*a*a*a+b},easeOutQuint:function(a,b,c,d){return c*((a=a/d-1)*a*a*a*a+1)+b},easeInOutQuint:function(a,b,c,d){return(a/=d/2)<1?c/2*a*a*a*a*a+b:c/2*((a-=2)*a*a*a*a+2)+b},easeInSine:function(a,b,c,d){return-c*Math.cos(a/d*(Math.PI/2))+c+b},easeOutSine:function(a,b,c,d){return c*Math.sin(a/d*(Math.PI/2))+b},easeInOutSine:function(a,b,c,d){return-c/2*(Math.cos(Math.PI*a/d)-1)+b},easeInExpo:function(a,b,c,d){return 0==a?b:c*Math.pow(2,10*(a/d-1))+b},easeOutExpo:function(a,b,c,d){return a==d?b+c:c*(-Math.pow(2,-10*a/d)+1)+b},easeInOutExpo:function(a,b,c,d){return 0==a?b:a==d?b+c:(a/=d/2)<1?c/2*Math.pow(2,10*(a-1))+b:c/2*(-Math.pow(2,-10*--a)+2)+b},easeInCirc:function(a,b,c,d){return-c*(Math.sqrt(1-(a/=d)*a)-1)+b},easeOutCirc:function(a,b,c,d){return c*Math.sqrt(1-(a=a/d-1)*a)+b},easeInOutCirc:function(a,b,c,d){return(a/=d/2)<1?-c/2*(Math.sqrt(1-a*a)-1)+b:c/2*(Math.sqrt(1-(a-=2)*a)+1)+b},easeInElastic:function(a,b,c,d){var e=1.70158,f=0,g=c;return 0==a?b:1==(a/=d)?b+c:(f||(f=.3*d),g<Math.abs(c)?(g=c,e=f/4):e=f/(2*Math.PI)*Math.asin(c/g),-(g*Math.pow(2,10*(a-=1))*Math.sin((a*d-e)*(2*Math.PI)/f))+b)},easeOutElastic:function(a,b,c,d){var e=1.70158,f=0,g=c;return 0==a?b:1==(a/=d)?b+c:(f||(f=.3*d),g<Math.abs(c)?(g=c,e=f/4):e=f/(2*Math.PI)*Math.asin(c/g),g*Math.pow(2,-10*a)*Math.sin((a*d-e)*(2*Math.PI)/f)+c+b)},easeInOutElastic:function(a,b,c,d){var e=1.70158,f=0,g=c;return 0==a?b:2==(a/=d/2)?b+c:(f||(f=d*(.3*1.5)),g<Math.abs(c)?(g=c,e=f/4):e=f/(2*Math.PI)*Math.asin(c/g),1>a?-.5*(g*Math.pow(2,10*(a-=1))*Math.sin((a*d-e)*(2*Math.PI)/f))+b:g*Math.pow(2,-10*(a-=1))*Math.sin((a*d-e)*(2*Math.PI)/f)*.5+c+b)},easeInBack:function(a,b,c,d,e){return void 0==e&&(e=1.70158),c*(a/=d)*a*((e+1)*a-e)+b},easeOutBack:function(a,b,c,d,e){return void 0==e&&(e=1.70158),c*((a=a/d-1)*a*((e+1)*a+e)+1)+b},easeInOutBack:function(a,b,c,d,e){return void 0==e&&(e=1.70158),(a/=d/2)<1?c/2*(a*a*(((e*=1.525)+1)*a-e))+b:c/2*((a-=2)*a*(((e*=1.525)+1)*a+e)+2)+b},easeInBounce:function(b,c,d,e){return d-a.animations.easeOutBounce(e-b,0,d,e)+c},easeOutBounce:function(a,b,c,d){return(a/=d)<1/2.75?c*(7.5625*a*a)+b:2/2.75>a?c*(7.5625*(a-=1.5/2.75)*a+.75)+b:2.5/2.75>a?c*(7.5625*(a-=2.25/2.75)*a+.9375)+b:c*(7.5625*(a-=2.625/2.75)*a+.984375)+b},easeInOutBounce:function(b,c,d,e){return e/2>b?.5*a.animations.easeInBounce(2*b,0,d,e)+c:.5*a.animations.easeOutBounce(2*b-e,0,d,e)+.5*d+c}},a}]),angular.module("angular-svg-round-progress").directive("roundProgress",["$window","roundProgressService","roundProgressConfig",function(a,b,c){var d={restrict:"EA",replace:!0,transclude:!0,scope:{current:"=",max:"=",semi:"=",rounded:"=",clockwise:"=",responsive:"=",radius:"@",color:"@",bgcolor:"@",stroke:"@",duration:"@",animation:"@",offset:"@"}};return b.isSupported?angular.extend(d,{link:function(e,f){var g,h,i=!f.hasClass("round-progress-wrapper"),j=i?f:f.find("svg").eq(0),k=j.find("path").eq(0),l=j.find("circle").eq(0),m=angular.copy(c);e.getOptions=function(){return m};var n=function(){var a=m.semi,c=m.responsive,d=+m.radius||0,e=+m.stroke,g=2*d,h=d-e/2-b.getOffset(f,m);j.css({top:0,left:0,position:c?"absolute":"static",width:c?"100%":g+"px",height:c?"100%":(a?d:g)+"px",overflow:"hidden"}),i||(j[0].setAttribute("viewBox","0 0 "+g+" "+(a?d:g)),f.css({width:c?"100%":"auto",position:"relative","padding-bottom":c?a?"50%":"100%":0})),f.css({width:c?"100%":"auto",position:"relative","padding-bottom":c?a?"50%":"100%":0}),k.css({stroke:b.resolveColor(m.color),"stroke-width":e,"stroke-linecap":m.rounded?"round":"butt"}),a?k.attr("transform",m.clockwise?"translate(0,"+g+") rotate(-90)":"translate("+g+", "+g+") rotate(90) scale(-1, 1)"):k.attr("transform",m.clockwise?"":"scale(-1, 1) translate("+-g+" 0)"),l.attr({cx:d,cy:d,r:h>=0?h:0}).css({stroke:b.resolveColor(m.bgcolor),"stroke-width":e})},o=function(c,d,e){var h=b.toNumber(m.max||0),i=c>0?a.Math.min(c,h):0,j=d===i||0>d?0:d||0,l=i-j,n=b.animations[m.animation],o=new a.Date,p=+m.duration||0,q=e||c>h&&d>h||0>c&&0>d||25>p,r=m.radius,s=r-m.stroke/2-b.getOffset(f,m),t=2*r,u=m.semi;q?b.updateState(i,h,s,k,t,u):(a.cancelAnimationFrame(g),function v(){var c=a.Math.min(new Date-o,p);b.updateState(n(c,j,l,p),h,s,k,t,u),p>c&&(g=a.requestAnimationFrame(v))}())},p=Object.keys(d.scope).filter(function(a){return"current"!==a});e.$watchGroup(p,function(a){for(var b=0;b<a.length;b++)"undefined"!=typeof a[b]&&(m[p[b]]=a[b]);n(),e.$broadcast("$parentOffsetChanged"),"inherit"!==m.offset||h?"inherit"!==m.offset&&h&&h():h=e.$on("$parentOffsetChanged",function(){o(e.current,e.current,!0),n()})}),e.$watchGroup(["current","max","animation","duration","radius","stroke","semi","offset"],function(a,c){o(b.toNumber(a[0]),b.toNumber(c[0]))})},template:function(a){for(var c=a.parent(),d="round-progress",e=['<svg class="'+d+'" xmlns="http://www.w3.org/2000/svg">','<circle fill="none"/>','<path fill="none"/>',"<g ng-transclude></g>","</svg>"];c.length&&!b.isDirective(c);)c=c.parent();return c&&c.length||(e.unshift('<div class="round-progress-wrapper">'),e.push("</div>")),e.join("\n")}}):angular.extend(d,{template:'<div class="round-progress" ng-transclude></div>'})}])
////
////   GAME CONTROLLER FOOTER    ////
	game.init();
	//game.demoMakePlayers();

	$scope.hideLoading = function() {
	    $timeout(function() {
	        $ionicLoading.hide();
	    }, 1000);
	};
	$scope.hideLoading();
};  ////     END GAME CONTROLLER     ////
///////      END GAME CONTROLLER     ////

