var app = angular.module('StarterApp');
app.controller('LocationFilterListController', [ 'InstanceData', '$timeout', '$scope',
                                                 function(InstanceData, $timeout, $scope) {
	$scope.instance = null;
	$scope.instances = null;

	$scope.locations = null;
	$scope.loadLocations = function() {
		// Use timeout to simulate a 650ms request.
		return $timeout(function() {
			$scope.locations =  $scope.locations  || [
			                                          { id: 0, locationName: 'Location: All', selectValue: undefined },
			                                          { id: 1, locationName: 'Brasília', selectValue: 'BSA' },
			                                          { id: 2, locationName: 'São Paulo', selectValue: 'SPO' },
			                                          { id: 3, locationName: 'Rio de Janeiro', selectValue: 'RJO' }
			                                          ];
		}, 650);
	};
}]);