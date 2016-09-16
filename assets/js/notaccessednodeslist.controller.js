var app = angular.module('StarterApp');
app.controller('NotAccessedNodesController', [ 'NotAccessedNodes', 'InstanceData', '$scope',
		function(NotAccessedNodes, InstanceData, $scope) {
			'use strict';
			var bookmark;
			$scope.paginationTotalItems = 1;
			$scope.selected = [];
			$scope.instances = [];
			$scope.query = {
				instanceName : '',
				selectedLocation : { id: 1, locationName: 'Brasília', selectValue: 'BSA' },
				order : 'nodeName',
				limit : 10,
				page : 1
			};
			$scope.filter = {
				options : {
					debounce : 500
				}
			};
			$scope.nodes = {
				count : 0,
				data : []
			};
			$scope.limitOptions = [ 5, 10, 15 ];
			$scope.options = {
				rowSelection : true,
				multiSelect : true,
				autoSelect : true,
				decapitate : false,
				largeEditDialog : false,
				boundaryLinks : true,
				limitSelect : true,
				pageSelect : false
			};
			$scope.removeFilter = function() {
				$scope.filter.show = false;
				$scope.filter.search = '';
				if ($scope.filter.form.$dirty) {
					$scope.filter.form.$setPristine();
				}
			};

			// $scope.nodes = NotAccessedNodes.query();
			function success(nodes) {
				$scope.nodes.data = $scope.nodes.data.concat(nodes.data);
				$scope.nodes.count = $scope.nodes.data.length;
			};		
			function processInstance(instances) {
				$scope.instances = instances.data;
				instances.data.forEach(function(instance) {
					$scope.promise = NotAccessedNodes.nodes.get({
						instanceName : instance.instanceName
					}, success).$promise;
				});
			}
			;
			$scope.getNodes = function() {
				$scope.nodes.data = [];
				$scope.selected = [];
				$scope.ipromise = InstanceData.instances.get({
					active : 1,
					hostingLocation : $scope.query.selectedLocation.selectValue
				}, processInstance).$ipromise;
			};
			$scope.getNodes();
			$scope.$watch('filter.search', function(newValue, oldValue) {
				if (!oldValue) {
					bookmark = $scope.query.page;
				}

				if (newValue !== oldValue) {
					$scope.query.page = 1;
				}

				if (!newValue) {
					$scope.query.page = bookmark;
				}

				// $scope.getNodes();
			});

		} ]);