(function(){
    angular.module('nearme').controller('reviewModalCtrl', reviewModalCtrl);

    reviewModalCtrl.$inject = ['$uibModalInstance', 'nearmeData', 'locationData'];
    function reviewModalCtrl($uibModalInstance, nearmeData, locationData){
        var vm = this;
        vm.locationData = locationData;
        vm.modal = {
            cancel: function(){
                $uibModalInstance.dismiss('cancel'); //TODO: fix possibly unhandled rejection :cancel
            },
            close: function(result){
                $uibModalInstance.close(result);
            }
        };

        vm.onSubmit = function(){
            vm.formError = "";
            if(!vm.formData.rating || !vm.formData.reviewText){
                vm.formError = "All fields required, please try again";
                return false;
            }else{
                vm.doAddReview(vm.locationData.locationid, vm.formData);
            }
        };

        vm.doAddReview = function(locationid, formData){
            nearmeData.addReviewById(locationid, {
                rating: formData.rating,
                reviewText: formData.reviewText
            })
            .then(function successCallback(data){
                vm.modal.close(data.data);
            },
            function errorCallback(e){ 
                vm.formError = "Your review has not been saved, please try again";
            });
            return false;
        };
    }
})();