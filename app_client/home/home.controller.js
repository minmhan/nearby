(function(){
    angular.module('nearme').controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$scope', '$uibModal', 'nearmeData', 'geolocation'];
    function homeCtrl($scope, $uibModal, nearmeData, geolocation){
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
        vm.message = 'Checking your location...';
        vm.loading = true;
        vm.getData = function(position){
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            vm.message = 'searching for near by places';
            nearmeData.locationByCoords(lat, lng)
            .then(
                function(result){ 
                    vm.message = result.data.length > 0 ? '' : 'no location found';
                    vm.data = { locations: result.data }; 
                    vm.loading = false;
                }, 
            function(e){ 
                vm.message = "sorry, something is gone wrong";
                vm.loading = false;
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

        vm.popupNewLocForm = function(){
            var modalInstance = $uibModal.open({
            templateUrl: '/locationNewModal/locNewModal.view.html',
                controller: 'locNewModalCtrl as vm',
                resolve: {
                    locationData: function(){
                        return {
                            //locationid: vm.locationid,
                            //locationName: vm.data.location.name
                        };
                    }
                }
            });
            
            modalInstance.result.then(function(data){
                //vm.data.location.reviews.push(data);
            });
        }

        geolocation.getPosition(vm.getData, vm.showError, vm.noGeo);

    }
})();