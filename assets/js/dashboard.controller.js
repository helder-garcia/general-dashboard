var app = angular.module('StarterApp');
app.controller('dashboardCtrl', ['$scope', function($scope){
	}]);
app.controller('dashboardWidget01Ctrl', ['$scope', 'driveData', '$interval', function($scope, driveData, $interval){
	var filteredLoaded = [];
	var filteredEmpty = [];
	var maximum = 10;
	$scope.options = {
			animation: false,
			datasetStroke : true
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
    $interval(function(){
    	$scope.get();
    }, 10000);
	  //$scope.labels = ["A", "B"];
	  
	  //$scope.data = [
	    //[65],
	   // [28]
	 // ];
	  $scope.onClick = function (points, evt) {
	    console.log(points, evt);
	  }; 
	}]);
app.controller('dashboardWidget02Ctrl', ['$scope', function($scope){
    $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"];
    $scope.data = [300, 500, 100, 40, 120];
	}]);
app.controller('dashboardWidget03Ctrl', ['$scope', function($scope){
	 $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
	  $scope.series = ['Series A', 'Series B'];
	  $scope.data = [
	    [65, 59, 80, 81, 56, 55, 40],
	    [28, 48, 40, 19, 86, 27, 90]
	  ];
	}]);
app.controller('dashboardWidget04Ctrl', ['$scope', function($scope){
    $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"];
    $scope.data = [300, 500, 100, 40, 120];
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