var app = angular.module('StarterApp');
app.controller('NotAccessedNodesController', [ 'NotAccessedNodes', '$scope',
		function(NotAccessedNodes, $scope) {
			'use strict';
			var bookmark;

			$scope.selected = [];
			$scope.query = {
				order : 'nodeName',
				limit : 10,
				page : 1
			};
			$scope.filter = {
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
			//$scope.nodes = NotAccessedNodes.query();
			  function success(nodes) {
				    $scope.nodes = nodes;
				  };
			  $scope.getNodes = function () {
				    $scope.promise = NotAccessedNodes.nodes.get($scope.query, success).$promise;
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
					    
					    $scope.getNodes();
					  });				  

		} ]);