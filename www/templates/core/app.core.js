angular
    .module('app.core')
    .factory('dataservice', dataservice);

dataservice.$inject = ['$http', 'logger'];

function dataservice($http, logger) {
    return {
        getGameText: getGameText
    };

    function getGameText() {
        return $http.get('/api/game_text.json')
            .then(getGameTextComplete)
            .catch(getGameTextFailed);

        function getGameTextComplete(response) {
            return response.data.results;
        }

        function getGameTextFailed(error) {
            logger.error('XHR Failed for getGameText.' + error.data);
        }
    }
};
