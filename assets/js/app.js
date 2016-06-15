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
		controller : 'LibScratchListController'
	}).when('/nodesoccupancy', {
		templateUrl : 'assets/html/nodes-occupancy-list.html',
		controller : 'NodesOccupancyController'
	}).when('/notaccessednodes', {
		templateUrl : 'assets/html/not-accessed-nodes-list.html',
		controller : 'NotAccessedNodesController'
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
	  var authenticMap = $mdThemingProvider.extendPalette('teal', {
		    'A700': '#60BEC6',
		    'contrastDefaultColor': 'light'
		  });
		  // Register the new color palette map with the name <code>neonRed</code>
		  $mdThemingProvider.definePalette('authenticGreen', authenticMap);
	  $mdThemingProvider.theme('default')
	    .primaryPalette('authenticGreen', {
	        'default': 'A700', // by default use shade 400 from the pink palette for primary intentions
	        'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
	        'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
	        'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
	      })
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
            $http.get("http://localhost:1337/Drive")
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
//app.factory('instanceData', function ($http, $q) {
//    return {
//        instances: function () {
//            var deferred = $q.defer();
//            setTimeout(function() {
            //$http.get("http://wstsm.supcd.serpronet.serpro:1337/Instance")
//            $http.get("http://localhost:1337/Instance")
//                .success(function (data, status, headers, config) {
//                    deferred.resolve(data);
//                }).error(function (data, status, headers, config) {
//                    deferred.reject(data);
//                });
//            }, 1000);
//            return deferred.promise;
//        }
//    }
//});

//app.factory('Instance', function ($resource, $timeout, $q) {
//	var resource = $resource('http://wstsm.supcd.serpronet.serpro:1337/Instance/:id', null, {
//		'update': { method: 'PUT'},
//		'query': { method:'GET', isArray:false}
//	});
//	return resource;
//});

app.factory('LibScratch', function ($resource, $timeout, $q) {
	//var resource = $resource('http://wstsm.supcd.serpronet.serpro:1337/libscratch/:id', null, {
	var resource = $resource('http://localhost:1337/libscratch/:id', null, {
		'update': { method: 'PUT'},
		'query': { method:'GET', isArray:false}
	});
	return resource;
});

app.factory('NodesOccupancy', function ($resource, $timeout, $q) {
	//var resource = $resource('http://wstsm.supcd.serpronet.serpro:1337/libscratch/:id', null, {
	var resource = $resource('http://localhost:1337/nodesoccupancy/:id', null, {
		'update': { method: 'PUT'},
		'query': { method:'GET', isArray:false}
	});
	return resource;
});

app.factory('NotAccessedNodes', ['$resource', function ($resource) {
	'use strict';
	  return {
		    nodes: $resource('http://localhost:1337/notaccessednodes/:id')
		  };
}]);

app.factory('InstanceData', ['$resource', function ($resource) {
	'use strict';
	  return {
		    instances: $resource('http://localhost:1337/Instance/:id')
		  };
}]);