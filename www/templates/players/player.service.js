
angular
  .module('app')
    .factory('PlayerService', PlayerService);
/* 
*  @AppController
*/
function PlayerService() {
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
};