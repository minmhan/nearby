angular.module('nearme', []);

var locationListCtrl = function($scope, nearmeData, geolocation){
    $scope.message = 'checking your location...';

    $scope.getData = function(position){
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        $scope.message = 'searching for near by places';

        nearmeData.locationByCoords(lat, lng)
        .then(
            function(result){ 
                $scope.message = result.data.length > 0 ? '' : 'no location found';
                $scope.data = { locations: result.data}; 
            }, 
            function(e){ 
                $scope.message = "sorry, something is gone wrong";
            });
    };

    $scope.showError = function(error){
        $scope.$apply(function(){
            $scope.message = error.message;
        });
    }

    $scope.noGeo = function(){
        $scope.$apply(function(){
            $scope.message = 'geo location not supported by this browser';
        });
    }

    geolocation.getPosition($scope.getData, $scope.showError, $scope.noGeo);
};

var _isNumeric = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

var formatDistance = function(){
    return function(distance){
        var numDistance, unit;
        if(distance && _isNumeric(distance)){
            if(distance > 1){
                numDistance = parseFloat(distance).toFixed(1); // round to 1 decimal place
                unit = 'km';
            }else{
                numDistance = parseInt(distance * 1000, 10);
                unit = 'm';
            }
                return numDistance + unit;
        }else{
            return "?";
        }
    };
};

var ratingStars = function(){
    return {
        scope: {
            thisRating: '=rating'
        },
        templateUrl: "/angular/rating-stars.html"
    };
};

var nearmeData = function($http){
    var locationByCoords = function(lat, lng){
        return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxDistance=20');
    };
    return {
        locationByCoords: locationByCoords
    };
};

var geolocation = function(){
    var getPosition = function(cbSuccess, cbError, cbNoGeo){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
        }else{
            cbNoGeo();
        }
    };
    return {
        getPosition : getPosition
    }
};

angular
    .module('nearme')
    .controller('locationListCtrl', locationListCtrl)
    .filter('formatDistance', formatDistance)
    .directive('ratingStars', ratingStars)
    .service('nearmeData', nearmeData)
    .service('geolocation', geolocation);