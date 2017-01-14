(function(){
    angular.module('nearme').service('nearmeData', nearmeData);

    nearmeData.$inject = ['$http'];
    function nearmeData($http){
        var locationByCoords = function(lat, lng){
            return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxDistance=20000');
        };

        var locationById = function(locationid){
            return $http.get('/api/locations/' + locationid);
        };

        var addReviewById = function(locationid, data){
            return $http.post('/api/locations/' + locationid + '/reviews', data);
        };

        return {
            locationByCoords: locationByCoords,
            locationById: locationById,
            addReviewById: addReviewById
        };
    }
})();