(function(){
    angular.module('nearme', ['ngRoute']);

    function config($routeProvider){
        $routeProvider.when('/', {
            templateUrl:'home/home.view.html',
            controller:'homeCtrl',
            controllerAs: 'vm'
        })
        .otherwise({redirectTo:'/'});
    }

    angular.module('nearme').config(['$routeProvider', config]);
})();