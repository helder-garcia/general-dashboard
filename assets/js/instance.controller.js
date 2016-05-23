var app = angular.module('StarterApp');
app.controller('InstanceController', [
'$scope',
'$routeParams',
function($scope, $routeParams) {
	$scope.edit = function () {
		var id = $routeParams.id;
	}
}]);