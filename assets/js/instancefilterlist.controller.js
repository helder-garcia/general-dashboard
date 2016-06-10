var app = angular.module('StarterApp');
app.controller('InstanceFilterListController', [ 'InstanceData', '$timeout', '$scope',
		function(InstanceData, $timeout, $scope) {
	  $scope.instance = null;
	  $scope.instances = null;
	  $scope.loadInstances = function() {
	    // Use timeout to simulate a 650ms request.
	    return $timeout(function() {
	      $scope.instances =  $scope.instances  || [
	        { id: 1, instanceName: 'TSMBSBBKP1500' },
	        { id: 2, instanceName: 'TSMBSBARC1600' },
	        { id: 3, instanceName: 'TSMBSBLMR1700' },
	        { id: 4, instanceName: 'TSMBSBBKP1800' },
	        { id: 5, instanceName: 'TSMBSBARB1900' },
	        { id: 6, instanceName: 'DFCDBKP2500' },
	        { id: 7, instanceName: 'DFCDBKP2700' },
	        { id: 8, instanceName: 'DFCDBKP2800' },
	        { id: 9, instanceName: 'DFCDBKP2900' },
	        { id: 10, instanceName: 'DFCDBKPEXP3500' }
	      ];
	    }, 650);
	  };	
}]);