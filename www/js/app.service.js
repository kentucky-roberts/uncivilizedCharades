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
}]); //  function DealerService])


