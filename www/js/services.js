angular
  .module('app.services', [])


 .service('LoginService', function($q) {
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;
 
            if (name == 'user' && pw == 'secret') {
                deferred.resolve('Welcome ' + name + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})





.service('ModalService', function($ionicModal, $rootScope) {
  
  var init = function(tpl, $scope) {

    var promise;
    $scope = $scope || $rootScope.$new();
    
    promise = $ionicModal.fromTemplateUrl(tpl, {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      return modal;
    });

    $scope.openModal = function() {
       $scope.modal.show();
     };
     $scope.closeModal = function() {
       $scope.modal.hide();
     };
     $scope.$on('$destroy', function() {
       $scope.modal.remove();
     });
    
    return promise;
  }
  
  return {
    init: init
  }
  
})



 // .factory('UserSrvice', function() {
     
 //      var service = {
 //          newUser: newUser
 //      };

 //    /**
 //     * New User Object
 //     * @param playerName
 //     * @param initialScore
 //     * @constructor
 //     */

 //      function User(userName, password) {
 //          this.userName = userName;
 //          this.password = password;
 //      }

 //      function newUser(userName, password) {
 //        var user = newUser(userName, password);
 //        return user;
 //      }
 //      return service;
 // })



  .factory('TeamService', function() {
    var service = {
      newTeam: newTeam
      //identifyTeams: identifyTeams
    };
    /**
     * New User Object
     * @param playerName
     * @param initialScore
     * @constructor
     */

      function Team(tn, p) {
          	this.teamName = tn;
		this.players = p;
		this.score = 0;
      }

	Team.prototype.logInfo = function() {
	  console.log("teamName: " + this.teamName + " players: "+ this.players.name+ " Score: " + this.score);
	};

	Team.prototype.setScore = function() {
		console.log("Team.prototype.setScore()");
	};


      function newTeam(tn, p) {
      	var team = new Team(tn, p);
      	//console.log(player);
      	return team;
      }
      return service;
 })




  .factory('PlayerService', function() {
    var service = {
      newPlayer: newPlayer
    };
    /**
     * New Player Object
     * @param playerName
     * @param initialScore
     * @constructor
     */
    function Player(playerName) {
	this.name = playerName;
      this.initialScore = 0;
      this.score = this.initialScore;
      this.isActive = false;
    }

    Player.prototype.logInfo = function() {
		console.log("Name: " +this.name+ " initialScore: "+ this.initialScore  +  " Score: "+ this.score +  " isActive: "+ this.isActive   );
	};
    /**
     * Change the score by amount
     * @param amountToChange
     */

    Player.prototype.changeScore = function(amountToChange){
        if(!angular.isDefined(this.score)){
            this.score = this.initialScore;
        }
        this.score += amountToChange;
    };

    Player.prototype.activatePlayer = function() {
        this.isActive = true;
    };

    Player.prototype.deActivatePlayer = function() {
        this.isActive = false;
    };

    Player.prototype.resetScore = function () {
        this.score = this.initialScore;
    };

    Player.prototype.getPlayers = function() {
      console.log("Return all of the players!");
    };

    /**
     * Resets the score of a player back to initial score.
     */
    Player.prototype.resetScore = function () {
        this.score = this.initialScore;
    };
    /**
     * Creates a new player object
     * @param playerName
     * @param initialScore
     * @returns {PlayerService.Player}
     */
    function newPlayer(playerName) {
      var player = new Player(playerName);
      //console.log(player);
      return player;
    }
    return service;
  })



.factory('GameService', function() {

    var service = {
        secondsRemaining: secondsRemaining,
        maxScore: maxScore
    };

    ////////////////////

    var _maxScore = 10;

    var _secondsRemaining = 59;

    /**
     * Returns the numeric maximum hand value before busting
     * @returns {number}
     */
    function maxScore(){
        return _maxScore;
    }

    function secondsRemaining(){
        return _secondsRemaining;
    }


    function handValue(hand){
      //Get the values of each card (counting 1 for each ace)
            hand.forEach(function(card) {
               
              var phrase = card.phrase;
              var altPhrase = card.alt_phrase;
              totalValue = phrase+ altPhrase;
            });
            return totalValue;
    }

    // function teamScore(team){
    //   var totalScore = 0;

    //   team.forEach(function(player){

    //       totalScore += Number(player.score);

    //   });
    //   return totalScore;
//    } // function teamScore(team)


    return service;
}) //  function GameService])




.service('CountdownService', function() {
    this.tags = {
        a: true,
        b: true
    };
    
    this.setTrueTag = function() {
        this.tags.a = true;
        this.tags.b = true;
        
        //how do I get the watch in MyCtrl to be triggered?
    };
    
    this.setFalseTag = function() {
        this.tags.a = false;
        this.tags.b = false;
        
        //how do I get the watch in MyCtrl to be triggered?
    };
})



.factory('DealerService', ['GameService', '$timeout', function(GameService, $timeout) {
      var service = {
            newDealer: newDealer,
            Dealer: Dealer
        };

        function newDealer(deck){
            var dealer = new Dealer(deck);
            return dealer;
        }

        function Dealer(deck){
            var dealer = this;
            dealer.deck = deck;

            /**
             * Creates initial values for dealer object
             */
            dealer.init = function(){
                dealer.cards = [];
                dealer.handValue = 0;
                dealer.isDone = false;
                dealer.busted = false;
                dealer.maxValue = GameService.maxValue();
                console.log('dealer.init was just called and returned' + dealer.maxValue);
                dealer.minValue = 17;
            };

            dealer.deal = function(){
                dealer.init();
                
                dealer.hit(true, false, dealer.getHandValue);
                dealer.hit(false, false, dealer.getHandValue);
            };

            dealer.hit = function(hideCard, animate, callback){
              console.log('dealer.hit' + dealer.hit);

                var card = dealer.deck.deal();
                card.hideValue = hideCard;
                dealer.cards.push(card);

                if(animate){
                    card.hideValue = true;
                    $timeout(function(){
                        card.hideValue = false;
                        callback();
                    },1000);
                }
                else {
                    callback();
                }
            };

            /**
             * Uses game service to calculate hand value
             */
            dealer.getHandValue = function(){
                dealer.handValue = GameService.handValue(dealer.cards);
            };

            dealer.init();
   
    } // function teamScore(team)
    return service;
}]) //  function GameService])


.factory("CardService", function() {

  var cardTypes =
    [
      {
        "id":1,
        "phrase":"One Legged Skier",
        "alt_phrase":"Pussy Cat"
      },
      {
        "id":2,
        "phrase":"Psychedelic Trip",
        "alt_phrase":"Tooth Fairy"
      },
      {
        "id":3,
        "phrase":"European Creeper",
        "alt_phrase":"Long Brown Hair"
      },
      {
        "id":4,
        "phrase":"Twerking Santa",
        "alt_phrase":"Rock A By Baby"
      },
      {
        "id":5,
        "phrase":"Pregnant Twerker",
        "alt_phrase":"Bug On The Ceiling"
      },
      {
        "id":6,
        "phrase":"Police Brutality",
        "alt_phrase":"Walking On The Sun"
      },
      {
        "id":7,
        "phrase":"Taser Victim",
        "alt_phrase":"Milky Way Galaxy"
      },
      {
        "id":8,
        "phrase":"Shwag Weed",
        "alt_phrase":"Dance The Night Away"
      },
      {
        "id":9,
        "phrase":"Bong Rip",
        "alt_phrase":"The Roof Is Out Fire"
      },
      {
        "id":10,
        "phrase":"Panty Thief",
        "alt_phrase":"Michael Jackson Moves"
      },
    ];

  var activeCard = cardTypes[0]; //initialize with 0

  function setActiveCard(index) {
      activeCard = cardTypes[index];
      console.log('activeCard is now ' + activeCard)
  }
  return {
    all: function() {
      return cardTypes;
    },
    first: function() {
      return cardTypes[0].phrase;
    },
    oneCard: function() {
      return cardTypes.slice(0,1);
    },
    threeCards: function() {
      return cardTypes.slice(0,3);
    },
    reload: function() {
      return cardTypes.slice(0,3);
    },
    destroyCard: function(index) {
      return cardTypes.slice(index, 1);
    },
    remove: function(card) {
      cards.splice(cards.indexOf(card), 1);
    },
    activeCard: function() {
      return activeCard;
    },
    getActiveCard: function(index) {
      setActiveCard(index);
      console.log(activeCard);
    },
    get: function(cardId) {
      for (var i = 0; i < cards.length; i++) {
        if (card[i].id === parseInt(cardId)) {
          return cards[i];
        }
      }
      return null;
    } // get:
  };
})


// .factory('UserService', function ($resource) {
//       var data = $resource('../api/users/:user', {user: '@user'}, {
//       update:{
//           method:'PUT'
//           }
//       });
//       return data;
//   });



.factory('UserService', ['$resource',
  function($resource){
    return $resource('api/users.json', {}, {
      query: {method:'GET', params:{userId:'users'}, isArray:true}
    });

   

  }]);
