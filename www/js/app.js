angular.module('pinglio', [
    'ngAnimate',
    'ngMaterial'
]);

var socket = io();


angular.module('pinglio')
    .controller('AppCtrl', function($scope) {
        var vm = this;

        socket.on('website', function(hosts) {
            console.log(hosts);
            vm.websites = hosts;
            $scope.$digest();
        });

        console.log('Hello World');
    });
