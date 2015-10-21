var app = angular.module('StarterApp', ['ngMaterial', 'ngRoute', 'chart.js']);
app.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/dashboard', {
		templateUrl : 'assets/html/dashboard.html',
		controller : 'dashboardCtrl'
	}).when('/nodes', {
		templateUrl : 'assets/html/node-list.html',
		controller : 'NodeListController'
	}).when('/nodes/:nodeId', {
		templateUrl : 'partials/node-detail.html',
		controller : 'NodeDetailCtrl'
	}).when('/', {
		redirectTo : '/dashboard'
	}).otherwise({
		redirectTo : '/dashboard'
	});
} ]);
app.controller('AppCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
}]);