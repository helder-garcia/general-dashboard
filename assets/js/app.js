var app = angular.module('StarterApp', ['md.data.table', 'ngMaterial', 'ngRoute', 'ngResource', 'ngAnimate', 'chart.js', 'vAccordion']);
app.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/dashboard', {
		templateUrl : 'assets/html/dashboard.html',
		controller : 'dashboardCtrl'
	}).when('/nodes', {
		templateUrl : 'assets/html/node-list.html',
		controller : 'NodeListController'
	}).when('/instances', {
		templateUrl : 'assets/html/instance-list.html',
		controller : 'InstanceListController'
	}).when('/libscratch', {
		templateUrl : 'assets/html/libscratch-list.html',
		controller : 'LibScratchController'
	}).when('/instances/:id/edit', {
		templateUrl : 'assets/html/instance-edit.html',
		controller : 'InstanceController'
	}).when('/nodes/:nodeId', {
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
app.config(['$resourceProvider', function($resourceProvider) {
	  // Don't strip trailing slashes from calculated URLs
	  $resourceProvider.defaults.stripTrailingSlashes = false;
	}]);
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
            $http.get("http://10.200.84.205:1337/Node")
            	//$http.get("http://localhost:1337/Node")
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
            $http.get("http://10.200.84.205:1337/Drive")
            	//$http.get("http://localhost:1337/Drive")
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
app.factory('instanceData', function ($http, $q) {
    return {
        ajaxItems: function () {
            var deferred = $q.defer();
            setTimeout(function() {
            //$http.get("http://wstsm.supcd.serpronet.serpro:1337/Instance")
            $http.get("http://localhost:1337/Instance")
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
app.factory('libScratchData', function ($http, $q) {
    return {
        ajaxItems: function () {
            var deferred = $q.defer();
            setTimeout(function() {
            //$http.get("http://wstsm.supcd.serpronet.serpro:1337/LibScratch")
            $http.get("http://localhost:1337/LibScratch")
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
app.factory('Instance', function ($resource, $timeout, $q) {
	var resource = $resource('http://wstsm.supcd.serpronet.serpro:1337/Instance/:id', null, {
		'update': { method: 'PUT'},
		'query': { method:'GET', isArray:false}
	});
	return resource;
});
