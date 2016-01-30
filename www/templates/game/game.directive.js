angular
    .module('app')
    .directive('uncivilizedCharades', uncivilizedCharades);

function uncivilizedCharades() {
    var directive = {
        restrict: 'EA',
        templateUrl: 'app/game/new.game.directive.html',
        scope: {
            max: '=',
            players: '=',
            game: '='
        },
        controller: GameController,
        controllerAs: 'game',
        bindToController: true
    };

    return directive;
}

// GameController.$inject = ['CardService'];
// function GameController(CardService) {
//     var game = this;
//     game.min = 3;
//     game.players = PlayerService.getPlayers();
//     console.log('CTRL: game.min = %s', game.min);
//     console.log('CTRL: game.max = %s', game.players);
// }
