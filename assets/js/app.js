var app = angular.module('StarterApp', ['ngMaterial', 'ngRoute']);
app.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/dashboard', {
		templateUrl : 'assets/html/dashboard.html',
		controller : 'NodeListController'
	}).when('/nodes', {
		templateUrl : 'assets/html/node-list.html',
		controller : 'NodeListController'
	}).when('/nodes/:nodeId', {
		templateUrl : 'partials/node-detail.html',
		controller : 'NodeDetailCtrl'
	}).when('/', {
		templateUrl : 'assets/html/dashboard.html'
	}).otherwise({
		redirectTo : '/dashboard'
	});
} ]);
app.controller('AppCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
 
}]);