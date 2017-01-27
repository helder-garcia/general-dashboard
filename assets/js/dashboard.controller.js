var app = angular.module('StarterApp');
app.controller('dashboardCtrl', ['$scope', function($scope){
	}]);
app.controller('dashboardWidget01Ctrl', ['$scope', 'driveData', '$interval', function($scope, driveData, $interval){
	var filteredLoaded = [];
	var filteredEmpty = [];
	var maximum = 10;
	$scope.options = {
			animation: false,
			datasetStroke : true,
			title: {
				display: true,
				text: 'Tape Drives - Loaded x Empty'
			}
	};
	$scope.data = [];
	$scope.data.push([]);
	$scope.data.push([]);	
	$scope.labels = [];
	$scope.series = ['Drives Loaded', 'Drives Empty'];
    $scope.get = function () {
        $scope.items = driveData.ajaxItems();
        $scope.items.then(function (items) {
            filteredLoaded = items.data.filter(function(element) { return element.driveState == 'LOADED' });
            filteredEmpty = items.data.filter(function(element) { return element.driveState == 'EMPTY' });
            if ($scope.data[0].length > maximum) {
            	$scope.labels = $scope.labels.slice(1);
            	$scope.data[0] = $scope.data[0].slice(1);
            	$scope.data[1] = $scope.data[1].slice(1);
            }
            $scope.data[0].push(filteredLoaded.length);
            $scope.data[1].push(filteredEmpty.length);
            $scope.labels.push('');
        }, function (status) {
        });
    };
    var promise = $interval(function(){
    	$scope.get();
    }, 20000);
	  $scope.onClick = function (points, evt) {
	    console.log(points, evt);
	  }; 
	  $scope.$on('$routeChangeStart', function(next, current) {
		  $interval.cancel(promise);
	  });
	}]);
app.controller('dashboardWidget02Ctrl', ['InstanceData', '$scope', function(InstanceData, $scope){
	$scope.options = {
		title: {
			display: true,
			text: 'Nodes per Instance'
		}
	};
	function success(instances) {
		var instancesArray = instances.data;
		$scope.labels = instancesArray.map(function(a) {return a.instanceName;});
		$scope.data = instancesArray.map(function(a) {return a.nodesCount;});
	};
	$scope.getInstances = function () {
		$scope.promise = InstanceData.instances.get({active: 1}, success).$promise;
	};
	$scope.getInstances();
	}]);
app.controller('dashboardWidget03Ctrl', ['$scope', function($scope){
	 $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
	  $scope.series = ['Series A', 'Series B'];
	  $scope.data = [
	    [65, 59, 80, 81, 56, 55, 40],
	    [28, 48, 40, 19, 86, 27, 90]
	  ];
	}]);
app.controller('dashboardWidget04Ctrl', ['$scope', '$interval', 'DiskpoolsUtil', 'InstanceData', function($scope, $interval, DiskpoolsUtil, InstanceData){
	var filter = 10;
	$scope.diskpools = {
			count : 0,
			data : []
	};
	$scope.instances = [];
	$scope.query = {
			selectedLocation : { id: 1, locationName: 'Brasília', selectValue: 'BSA' }
	};
	$scope.options = {
			title: {
				display: true,
				text: 'Disk Pool Utilization'
			},
			legend: {
				display: false
			},
			tooltips: {
				enabled: true,
				mode: 'single',
				custom: function(tooltip) {
					if (!tooltip.body) {
						return;
					}
					var newLabel = "";
					var myRegex = new RegExp(/^(.*: )\(-*\d+\,\s-*\d+,\s(\d+|\d+\.\d+)\)$/);
					var parsedLine = myRegex.exec(tooltip.body[0].lines[0]);
					if (parsedLine === null) {
						newLabel = "Fetch error";
						console.log("line ", tooltip.body[0].lines[0]);
					} else {
						newLabel = parsedLine[1] + parsedLine[2] + '%';           	
					}
					tooltip.body[0].lines[0] = newLabel;
				}
			},
			scales: {
				xAxes: [{
					display: false,
					ticks: {
						max: 125,
						min: -125,
						stepSize: 10
					}
				}],
				yAxes: [{
					display: false,
					ticks: {
						max: 125,
						min: -125,
						stepSize: 10
					}
				}]
			}
	};
	function success(diskpools) {
		for (var i = 0; i < diskpools.count; i++) {
			if(diskpools.data[i].pctUtilized >= filter) {
				$scope.series.push(diskpools.data[i].instanceName + '|' + diskpools.data[i].stgPoolName);
				$scope.data.push([{
					x: randomScalingFactor(),
					y: randomScalingFactor(),
					r: diskpools.data[i].pctUtilized
				}]);
			}
		}
	};
	createChart();

    var promise = $interval(function(){
    	createChart();
    }, 60000);
	function processInstance(instances) {
		$scope.instances = instances.data;
		instances.data.forEach(function(instance) {
			console.log(instance.instanceName);
			DiskpoolsUtil.diskpools.get({
				instanceName : instance.instanceName,
				stgPoolType : "PRIMARY",
				devClass : ["DISK","FILE"]
			}, success);
		});
	};
	function createChart () {
		$scope.diskpools.data = [];
		$scope.series = [];
		$scope.data = [];
		InstanceData.instances.get({
			active : 1,
			hostingLocation : $scope.query.selectedLocation.selectValue
		}, processInstance);
	};

	function randomScalingFactor () {
		return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
	};

	function randomRadius () {
		return Math.abs(randomScalingFactor()) / 4;
	};
	$scope.$on('$routeChangeStart', function(next, current) {
		$interval.cancel(promise);
	});
}]);
app.controller('dashboardWidget01Copy', ['$scope', function($scope){
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
app.controller('dashboardWidget05Ctrl', ['$scope', '$interval', function ($scope, $interval) {
	var maximum = document.getElementById('container').clientWidth / 2 || 300;
	$scope.data = [[]];
	$scope.labels = [];
	$scope.options = {
	animation: false,
	showScale: false,
	showTooltips: false,
	pointDot: false,
	datasetStrokeWidth: 0.5
	};

	$interval(function () {
	getLiveChartData();
	}, 40);
	function getLiveChartData () {
	if ($scope.data[0].length) {
	$scope.labels = $scope.labels.slice(1);
	$scope.data[0] = $scope.data[0].slice(1);
	}
	while ($scope.data[0].length < maximum) {
	$scope.labels.push('');
	$scope.data[0].push(getRandomValue($scope.data[0]));
	}
	}
	}]);
	function getRandomValue (data) {
	var l = data.length, previous = l ? data[l - 1] : 50;
	var y = previous + Math.random() * 10 - 5;
	return y < 0 ? 0 : y > 100 ? 100 : y;
	}