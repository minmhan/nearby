(function(){
    angular.module('nearme').directive('navigation', navigation);

    function navigation(){
        return {
            restrict: 'EA',
            templateUrl: '/common/directives/navigation/navigation.template.html',
            controller: 'navigationCtrl as navvm'
        };
    }
})();