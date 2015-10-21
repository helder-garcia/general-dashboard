var app = angular.module('StarterApp', ['ngMaterial', 'ngRoute', 'chart.js']);
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
  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  }; 
}]);