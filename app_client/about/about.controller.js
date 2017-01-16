(function () {
    angular
    .module('nearme')
    .controller('aboutCtrl', aboutCtrl);
  
    function aboutCtrl() {
        var vm = this;
        vm.pageHeader = {
            title: 'About WiFi Near Me',
        };
        vm.main = {
            content: 'Wifi near me was created to help people find places to sit down and get a bit of work done.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit.'
        }; 
    }
})();