(function(){
    angular.module('nearme').service('nearmeData', nearmeData);

    nearmeData.$inject = ['$http'];
    function nearmeData($http){
        var locationByCoords = function(lat, lng){
            return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxDistance=20');
        };
        return {
            locationByCoords: locationByCoords
        };
    };
})();