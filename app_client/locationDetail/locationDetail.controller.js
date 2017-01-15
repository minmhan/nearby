(function(){
    angular.module('nearme').controller('locationDetailCtrl', locationDetailCtrl);

    locationDetailCtrl.$inject = ['$routeParams','$location', '$uibModal', 'nearmeData', 'authentication'];
    function locationDetailCtrl($routeParams,$location, $uibModal, nearmeData, authentication){
        var vm = this;
        vm.locationid = $routeParams.locationid;
        vm.isLoggedIn = authentication.isLoggedIn();
        vm.currentPath = $location.path();
        nearmeData.locationById(vm.locationid)
            .then(
                function successCallback(data){
                    vm.data = { location: data.data };
                    vm.pageHeader = {
                        title: vm.data.location.name
                    };
                }, 
                function errorCallback(e){
                    console.log(e);
                });

        vm.popupReviewForm = function(){
            var modalInstance = $uibModal.open({
                templateUrl: '/reviewModal/reviewModal.view.html',
                controller: 'reviewModalCtrl as vm',
                resolve: {
                    locationData: function(){
                        return {
                            locationid: vm.locationid,
                            locationName: vm.data.location.name
                        };
                    }
                }
            });
            
            modalInstance.result.then(function(data){
                vm.data.location.reviews.push(data);
            });
        };
    }
})();