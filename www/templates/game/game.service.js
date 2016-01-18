angular
  .module('app')
    .factory('GameService', GameService);

function GameService() {

    var service = {
        maxScore: maxScore,
        maxTime: maxTime
        // newTeams: newTeams
    };
    ////////////////////
    var _maxScore = 10;
    var _maxTime = 59;
    /**
     * Returns the numeric maximum hand value before busting
     * @returns {number}
     */
    function maxScore(){
        return _maxScore;
    }
    function maxTime(){
        return _maxTime;
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
}; //  function GameService])

