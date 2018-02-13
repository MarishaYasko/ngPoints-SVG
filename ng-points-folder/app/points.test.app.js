(function() {
    'use strict';

    angular.module('testPoints', ['ngPoints'])

        .run(function($location) {
            console.log($location.path());
        })

        .controller('TestPointsAppCtrl', TestPointsAppCtrl);

    TestPointsAppCtrl.$inject = ['$log', '$rootScope'];

    function TestPointsAppCtrl($log, $rootScope) {
        const ctrl = this;
        ctrl.love = 'I love this world!';
        $rootScope.hello = 'Test Points Page';
        $log.info('Points set will be loaded as well.');
    }

})();
