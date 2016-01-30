angular
  .module('app.service', [])

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
    reset: function() {
      var gameString = window.localStorage['games'];
      if(gameString) {
        gameString = [];
      }
      return [];
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
              availableGamePlayers.push(player);
              console.log("availableGamePlayers: " + availableGamePlayers.length);
              
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



.factory('CardType', ['$resource',
  function($resource){
    return $resource('api/card_types_new.json/', {}, {
      query: {method:'GET', params:{cardId:'card_types_new'}, isArray:true},
     // findRange:{method: 'GET', params:{cardXLevel:'@xLevel'/'@xLevelMax'}, isArray:true}
    });
  }])


.factory('TeamService', function() {
    var service = {
      newTeam: newTeam
    };

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





.factory('DealerService', ['GameService', 'CardService', '$timeout', function(GameService, CardService, $timeout) {
      
var dealer = this;
      var service = {
            newDealer: newDealer,
            Dealer: Dealer
        };

        var deck = CardService.all(); 
        function newDealer(deck){
            var dealer = new Dealer(deck);
            return dealer;
        }




        function Dealer(deck){
            var dealer = this;
            dealer.deck = deck;
        }



            /**
            **
             ** Creates initial values for dealer object
             **
             */
            dealer.init = function(){
                dealer.deck = [];
                dealer.handValue = 0;
                dealer.isDone = false;
                dealer.busted = false;
                dealer.maxValue = GameService.maxScore();
                console.log('dealer.init was just called and returned' + dealer.maxValue);
                dealer.minValue = 17;
            };

            dealer.makeDeck = function() {
                dealer.deck = {
                    master: CardService.all(),
                    cards: [], 
                    discards: [],
                };
                // console.log("dealer.deck.master:  " + dealer.deck.master.length);
                // console.log("dealer.deck.cards:  " + dealer.deck.cards.length);
                // console.log("dealer.deck.discards:  " + dealer.deck.discards.length);
            };
            
            dealer.makeDeck();


            dealer.refreshCards = function() {
                dealer.deck.cards = null;
                dealer.deck.discards = null;
                $timeout(function() {
                    dealer.deck.cards = Array.prototype.slice.call(dealer.deck.master, 0);
                });
               //  console.log("dealer.deck.master:  " + dealer.deck.master.length);
               //  console.log("dealer.deck.cards:  " + dealer.deck.cards.length);
               //  console.log("dealer.deck.discards:  " + dealer.deck.discards.length);
            };
            //dealer.refreshCards();

            dealer.deal = function(){
                dealer.hit(true, false, dealer.getHandValue);
                dealer.hit(false, false, dealer.getHandValue);
            };
            
            //dealer.deal();

            dealer.hit = function(hideCards, animate, callback){
              console.log('hideCards' + hideCards + 'animate: ' + animate + 'callback: ' + callback);

               
              var newHand = dealer.deck.master.slice(0,3);
console.log("your new cards: " + newHand);
                

            //     var card = dealer.deck.deal();

            //     card.hideValue = hideCard;
                
            //     dealer.deck.cards.push(card);

            //     if(animate){
            //         card.hideValue = true;
            //         $timeout(function(){
            //             card.hideValue = false;
            //             callback();
            //         },1000);
            //     }
            //     else {
            //         callback();
            //     }
            // };

            /**
             * Uses game service to calculate hand value
             */
            dealer.getHandValue = function(){
                console.log('dealer.getHandValue() ');

            };

            dealer.init();
   
    } // function teamScore(team)
    return service;
}]) //  function DealerService])





.factory('MessageService', function() {
    return {
        messages: {},
        addMessage: function(message, type) {
            this.messages[type] = this.messages[type] || [];
            this.messages[type].push(message);
        },
        clearMessages: function() {
            for(var x in this.messages) {
           delete this.messages[x];
        }
        }
    };
})

.factory('DemoService', function($rootScope){
    var service = {};
    service.topValue = 0;
    service.middleValue = 0;
    service.bottomValue = 0;

    service.updateTopValue = function(value){
        this.topValue = value;
        $rootScope.$broadcast("valuesUpdated");
    }

    service.updateMiddleValue = function(value){
        this.middleValue = value;
        $rootScope.$broadcast("valuesUpdated");
    }

    service.updateBottomValue = function(value){
        this.bottomValue = value;
        $rootScope.$broadcast("valuesUpdated");
    }

    return service;
});

var demo = angular.module('demo', ['demoService']);


