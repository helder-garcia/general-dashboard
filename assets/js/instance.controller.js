var app = angular.module('StarterApp');
app.controller('InstanceController', [
'Instance',
'$scope',
'$routeParams',
function(Instance, $scope, $routeParams) {
	$scope.instance = Instance.get({id: $routeParams.id});
	$scope.locations = ('bsa spo rjo').split(' ').map(function (location) { return { abbrev: location }; });	
	$scope.edit = function () {
		var id = $routeParams.id;
	}
}]);