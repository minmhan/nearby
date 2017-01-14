(function(){
    angular.module('nearme').controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$scope', 'nearmeData', 'geolocation'];
    function homeCtrl($scope, nearmeData, geolocation){
        var vm = this;
        vm.pageHeader = {
            title:'wifi near me',
            strapline:'Find places to work with wifi near you!'
        };
        vm.sidebar = {
            content: "Looking for wifi and a seat? Near Me helps you find places to work when out \
                    and about. Perhaps with coffee, cake or pint? \
                    Near Me help you find the place you are looking for."
        };
        vm.message = 'checking your location';

        vm.getData = function(position){
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            vm.message = 'searching for near by places';
            nearmeData.locationByCoords(lat, lng)
            .then(
                function(result){ 
                    vm.message = result.data.length > 0 ? '' : 'no location found';
                    vm.data = { locations: result.data}; 
                    //console.log(result.data);
                }, 
            function(e){ 
                vm.message = "sorry, something is gone wrong";
            });
        };

        vm.showError = function(error){
            $scope.$apply(function(){
                vm.message = error.message;
            });
        }

        vm.noGeo = function(){
            $scope.$apply(function(){
                vm.message = 'geo location not supported by this browser';
            });
        }

        geolocation.getPosition(vm.getData, vm.showError, vm.noGeo);

    }
})();