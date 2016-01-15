angular
  .module('app.services', [])


 .service('LoginService', function($q) {
    return {
        loginUser: function(userName, password) {
            var deferred = $q.defer();
            var promise = deferred.promise;
 
            if (userName == 'user' && password == 'secret') {
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



.service('CountdownService', function() {

    this.tags = {
        a: true,
        b: true
    };
    
    this.setTrueTag = function() {
        this.tags.a = true;
        this.tags.b = true;
    };
    
    this.setFalseTag = function() {
        this.tags.a = false;
        this.tags.b = false;
    };
})


 .factory('UserService', function() {
     
      var service = {
          newUser: newUser
      };
    /**
     * New User Object
     * @param playerName
     * @param initialScore
     * @constructor
     */

      function User(userName, password) {
          this.userName = userName;
          this.password = password;
      }

      function newUser(userName, password) {
        var user = newUser(userName, password);
        return user;
      }
      return service;
 })



 .factory('AppService', function() {
     
      var service = {
          newGamePlayer: newGamePlayer,
          //availableGamePlayers: availableGamePlayers
      };
     /**
     * New GamePlayer Object
     * @param gpName
     * @param gpFace
     * @param gpScore
     * @param gpTeam
     * @constructor
     */
      function GamePlayer(player) {
          this.gpName = player.name;
          this.gpFace = player.face;
          this.gpScore = player.score;
          this.gpTeam = player.team;
      }

      function newGamePlayer(player) {
        var gp = newGamePlayer(player);
        return gp;
      }


      function showAvailablePlayers(players){

        var availableGamePlayers = {};
      
            players.forEach(function(player) {

              app.availableGamePlayers.push(player);

               
              var name = player.name;
              var score= player.score;
              var team = player.team;

              if (player.team === team1) {
                  console.log(player.name + " is on Team1");
              }

              if (player.team === team2) {
                  console.log(player.name + " is on Team2");
              }

              availableGamePlayers = players;
            });
            return availableGamePlayers;
      }




      return service;
 })




.factory('Games', function() {
  return {
    all: function() {
      var gameString = window.localStorage['games'];
      if(gameString) {
        return angular.fromJson(gameString);
      }
      return [];
    },
    save: function(games) {
      window.localStorage['games'] = angular.toJson(games);
    },
    newGame: function(gameTitle) {
      // Add a new project
      return {
        title: gameTitle,
        players: []
      };
    },
    getLastActiveIndex: function() {
      return parseInt(window.localStorage['lastActiveGame']) || 0;
    },
    setLastActiveIndex: function(index) {
      window.localStorage['lastActiveGame'] = index;
    }
  }
})





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
      this.initialTeam = "FreeAgent";
      this.initialFace = "img/player-images/avatar.jpg";
      this.score = this.initialScore;
      this.team =  this.initialTeam;
      this.face = this.initialFace;
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

    Player.prototype.changeTeam = function(teamName){
        if(!angular.isDefined(this.team)){
            this.team = this.initialTeam;
        }
        this.team = teamName;
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
        maxScore: maxScore,
        secondsRemaining: secondsRemaining
        // newTeams: newTeams
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

    // var availablePlayers = AppService.availablePlayers();
    // var activePlayer = availablePlayers[0]; //initialize with 0

    // var availableTeams = AppService.availableTeams();
    // var activeTeam = availableTeams[0]; //initialize with 0

    // function setActivePlayer(index) {
    //     activePlayer = availablePlayers[index];
    //     console.log('activePlayer is now ' + activePlayer)
    // }

    // var activeTeam= availableTeams[0]; //initialize with 0

    // function setActiveTeam(index) {
    //     activeTeam = availableTeam[index];
    //     console.log('activeTeam is now ' + activeTeam)
    // }
    // return {
    //   all: function() {
    //     return availablePlayers;
    //   },
    //   getNewPlayers: function() {
    //     return availablePlayers;
    //   },
    //   getNewTeams: function() {
    //     return availableTeams;
    //   },
    //   destroyPlayer: function(index) {
    //     return availablePlayers.slice(index, 1);
    //   },
    //   removePlayer: function(player) {
    //     players.splice(players.indexOf(player), 1);
    //   },
    //   setActivePlayer: function(index) {
    //     setActivePlayer(index);
    //   },
    //   setActiveTeam: function(index) {
    //     setActiveTeam(index);
    //   },
    //   getPlayer: function(playerId) {
    //     for (var i = 0; i < players.length; i++) {
    //       if (player[i].id === parseInt(cardId)) {
    //         return players[i];
    //       }
    //     }
    //     return null;
    //   }, // getPlayer:
    //   getTeam: function(teamId) {
    //     for (var i = 0; i < teams.length; i++) {
    //       if (team[i].id === parseInt(teamId)) {
    //         return players[i];
    //       }
    //     }
    //     return null;
    //   } // getPlayer:
    // }


    // function teamScore(team){
    //   var totalScore = 0;

    //   team.forEach(function(player){

    //       totalScore += Number(player.score);

    //   });
    //   return totalScore;
//    } // function teamScore(team)


    return service;
}) //  function GameService])






.factory('DealerService', ['GameService', 'CardService', '$timeout', function(GameService, CardService, $timeout) {
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
            **
             ** Creates initial values for dealer object
             **
             */
            dealer.init = function(){
                dealer.cards = [];
                dealer.handValue = 0;
                dealer.isDone = false;
                dealer.busted = false;
                dealer.maxValue = GameService.maxScore();
                console.log('dealer.init was just called and returned' + dealer.maxValue);
                dealer.minValue = 17;
            };

            dealer.deal = function(){
                dealer.init();
                
                dealer.hit(true, false, dealer.getHandValue);
                dealer.hit(false, false, dealer.getHandValue);
            };

            dealer.hit = function(hideCards, animate, callback){
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
}]) //  function DealerService])




  .factory('FirebaseService', ['$firebaseArray', function($firebaseArray) {
    var cardTypes = new Firebase('https://charades-app.firebaseio.com/card_types');
    var activeCard = cardTypes[0]; //initialize with 0

    function setActiveCard(index) {
        activeCard = cardTypes[index];
        console.log('activeCard is now ' + activeCard)
    }
    return {
      all: function() {
        return $firebaseArray(cardTypes);
      },
      first: function() {
        return $firebaseArray(cardTypes[0].phrase);
      },
      oneCard: function() {
        return $firebaseArray(cardTypes.slice(0,1));
      },
      threeCards: function() {
        return $firebaseArray(cardTypes.slice(0,3));
      },
      reload: function() {
        return $firebaseArray(cardTypes.slice(0,3));
      },
      // destroyCard: function(index) {
      //   return $firebaseArray$remove(index).then(function(index) {
      //   index.key() === index.$id; // true
      // });
      // },
      // remove: function(card) {
      //   cards.splice(cards.indexOf(card), 1);
      // },
      setActiveCard: function(index) {
        setActiveCard(index);
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
  }])


.factory('Cards', ['$firebaseArray', function($firebaseArray) {
  var cardsRef = new Firebase('https://charades-app.firebaseio.com/card_types');



  return $firebaseArray(cardsRef);
}])

.factory('Players', ['$firebaseArray', function($firebaseArray) {
  var playersRef = new Firebase('https://charades-app.firebaseio.com/players');
  return $firebaseArray(playersRef);
}])

/*
.factory('CardTypes', ['$firebaseArray', function($firebaseArray) {
  var cardsRef = new Firebase('https://charades-app.firebaseio.com/cards');
  return $firebaseArray(cardsRef);
}])
*/

.factory('CardType', ['$resource',
  function($resource){
    return $resource('api/card_types.json/', {}, {
      query: {method:'GET', params:{cardId:'card_types'}, isArray:true},
      findRange:{method: 'GET', params:{cardXLevel:'@xLevel'/'@xLevelMax'}, isArray:true}
    });
  }])


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


.factory("ProductService", function() {

  var productTypes =
      [
        {
            id: 0,
            title: "Uncivilized Charades Black T-Shirt",
            price: "20.00",
            color: "Black",
            size: "Medium",
            description: "Show the world how Uncivilized you really are with you brand new Uncivilized Charades t-shirt!",
            count: 10,
            image: "img/product-images/unciv-chara-tshirt-black-01.png"
        }, {
            id: 1,
            title: "Uncivilized Charades White T-Shirt",
            price: "20.00",
            color: "White",
            size: "Medium",
            description: "Show the world how Uncivilized you really are with you brand new Uncivilized Charades t-shirt!",
            count: 15,
            image: "img/product-images/unciv-chara-tshirt-black-01.png"
        }
      ];

      var activeProduct = productTypes[0]; //initialize with 0

      function setActiveProduct(index) {
          activeProduct = productTypes[index];
          console.log('activeProduct is now ' + activeProduct)
      }
      return {
        all: function() {
          return productTypes;
        },
        remove: function(product) {
          products.splice(products.indexOf(product), 1);
        },
        activeProduct: function() {
          return activeProduct;
        },
        getActiveProduct: function(index) {
          setActiveProduct(index);
          console.log(activeProduct);
        },
        get: function(productId) {
          for (var i = 0; i < products.length; i++) {
            if (product[i].id === parseInt(productId)) {
              return products[i];
            }
          }
          return null;
        } // get:
    };
})


.factory('UserService', function ($resource) {
      var data = $resource('api/users.json/:user', {user: '@user'}, {
      update:{
          method:'PUT'
          }
      });
      return data;
  });




