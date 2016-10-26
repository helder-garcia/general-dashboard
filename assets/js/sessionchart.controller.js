var app = angular.module('StarterApp');

app.controller('sessionChartCtrl', ['$scope', 'SessionData', 'InstanceData', '$interval', 
                                    function($scope, SessionData, InstanceData, $interval) {
	var data = [];
	var progressIncrement = 0;
	$scope.data = [];
	$scope.labels =[];
	$scope.series = ['Series A'];
	$scope.loading = true;
	$scope.determinateValue = 0;
	$scope.refreshTime = 30;
	$scope.query = {
			selectedLocation : { id: 1, locationName: 'Brasília', selectValue: 'BSA' }
	};
	$scope.options = {
        scales: {
            xAxes: [{
                display: true,
	           	 ticks: {
	        		 beginAtZero : true,
	        		 suggestedMax : 10,
	                 min : 0,
	                 fixedStepSize: 1
	             }
            }],
            yAxes: [{

            }]
        }
    };

	function success(sessions) {
		$scope.data[data[sessions.data[0].instanceName]] = sessions.count - 1; // Retira a propria conexao
		$scope.determinateValue += progressIncrement;
		if($scope.determinateValue >= 100) {
			$scope.loading = false;
			$scope.determinateValue = 0;
		}
	};

	$scope.getInstances = function() {
		InstanceData.instances.get({
			active : 1,
			hostingLocation : $scope.query.selectedLocation.selectValue
		}, function(instances) {
				var i = 0;
				progressIncrement = 100 / instances.count;
				instances.data.forEach(function(instance) {
					data[instance.instanceName] = i;
					i++;
					$scope.labels.push(instance.instanceName);
					$scope.data.push(0);
				})
			}
		);

	};
	
	$scope.getSessions = function() {
		$scope.labels.forEach(function(instanceName) {
			$scope.promise = SessionData.sessions.get({
				instanceName : instanceName
			}, success).$promise;
		});
	};
	$scope.getInstances();

	var promise = $interval(function(){	
		$scope.getSessions();
	}, $scope.refreshTime * 1000);

    $scope.$watch('refreshTime', function() {
    	if(promise) $interval.cancel(promise);
    	promise = $interval(function(){	
    		$scope.getSessions();
    	}, $scope.refreshTime * 1000);    	
    });
    
	$scope.$on('$destroy',function(){
        if(promise) $interval.cancel(promise);
    });
}]);
