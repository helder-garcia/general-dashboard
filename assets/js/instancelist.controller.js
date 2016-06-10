var app = angular.module('StarterApp');
app.controller('InstanceListController', [ 'InstanceData', '$scope',
		function(InstanceData, $scope) {
			'use strict';
			var bookmark;

			$scope.selected = [];
			$scope.query = {
				order : 'instanceName',
				limit : 5,
				page : 1
			};
			$scope.filter = {
				instanceName : '',
				domainName : '',
			    options: {
			        debounce: 500
			    }
			};
			
			$scope.limitOptions = [5, 10, 15];
			$scope.options = {
					    rowSelection: true,
					    multiSelect: true,
					    autoSelect: true,
					    decapitate: false,
					    largeEditDialog: false,
					    boundaryLinks: true,
					    limitSelect: true,
					    pageSelect: true
			};			
			$scope.removeFilter = function() {
				$scope.filter.show = false;
				$scope.filter.search = '';
			    if($scope.filter.form.$dirty) {
			        $scope.filter.form.$setPristine();
			    }
			};

			  function success(data) {
				    $scope.instances = data;
				    console.log($scope.instances);
				  };
			  $scope.getInstances = function () {
				    $scope.promise = InstanceData.instances.get({}, success).$promise;
				  };
				  $scope.$watch('filter.search', function (newValue, oldValue) {
					    if(!oldValue) {
					      bookmark = $scope.query.page;
					    }
					    
					    if(newValue !== oldValue) {
					      $scope.query.page = 1;
					    }
					    
					    if(!newValue) {
					      $scope.query.page = bookmark;
					    }
					    
					    $scope.getInstances();
					  });				  

		} ]);