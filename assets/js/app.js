var app = angular.module('StarterApp', ['md.data.table', 'ngMaterial', 'ngRoute', 'ngAnimate', 'chart.js', 'vAccordion']);
app.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/dashboard', {
		templateUrl : 'assets/html/dashboard.html',
		controller : 'dashboardCtrl'
	}).when('/nodes', {
		templateUrl : 'assets/html/node-list.html',
		controller : 'NodeListController'
	}).when('/noes/:nodeId', {
		templateUrl : 'partials/node-detail.html',
		controller : 'NodeDetailCtrl'
	}).when('/', {
		redirectTo : '/dashboard'
	}).otherwise({
		redirectTo : '/dashboard'
	});
} ]);
app.config(function($mdThemingProvider) {
	  $mdThemingProvider.theme('default')
	    .primaryPalette('light-blue')
	    .accentPalette('blue-grey');
	});
app.controller('AppCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
}]);
app.factory('nodeData', function ($http, $q) {
    return {
        ajaxItems: function () {
            var deferred = $q.defer();
            setTimeout(function() {
            //$http.get("http://10.200.84.205:1337/Node")
            	$http.get("http://localhost:1337/Node")
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    deferred.reject(data);
                });
            }, 1000);
            return deferred.promise;
        }
    }
});
app.factory('driveData', function ($http, $q) {
    return {
        ajaxItems: function () {
            var deferred = $q.defer();
            setTimeout(function() {
            //$http.get("http://10.200.84.205:1337/Node")
            	$http.get("http://localhost:1337/Drive")
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    deferred.reject(data);
                });
            }, 1000);
            return deferred.promise;
        }
    }
});
