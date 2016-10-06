var app = angular.module('StarterApp');
app.controller('DiskpoolListController', [ 'DiskpoolsUtil', 'InstanceData', 'ActionMigrate', '$scope', '$mdDialog',
		function(DiskpoolsUtil, InstanceData, ActionMigrate, $scope, $mdDialog) {
			'use strict';
			var bookmark;
			
			$scope.paginationTotalItems = 1;
			$scope.selected = [];
			$scope.username = null;
			$scope.password = null;
			$scope.instances = [];
			$scope.query = {
				instanceName : '',
				selectedLocation : { id: 1, locationName: 'Brasília', selectValue: 'BSA' },
				order : '-pctUtilized',
				limit : 10,
				page : 1
			};
			$scope.filter = {
				options : {
					debounce : 500
				}
			};
			$scope.diskpools = {
				count : 0,
				data : []
			};
			
			$scope.limitOptions = [ 5, 10, 15 ];
			$scope.options = {
				rowSelection : true,
				multiSelect : true,
				autoSelect : false,
				decapitate : false,
				largeEditDialog : false,
				boundaryLinks : true,
				limitSelect : true,
				pageSelect : false,
				disableRow : true
			};
			$scope.removeFilter = function() {
				$scope.filter.show = false;
				$scope.filter.search = '';
				if ($scope.filter.form.$dirty) {
					$scope.filter.form.$setPristine();
				}
			};

			// $scope.nodes = NotAccessedNodes.query();
			function success(diskpools) {
				$scope.diskpools.data = $scope.diskpools.data.concat(diskpools.data);
				$scope.diskpools.count = $scope.diskpools.data.length;
			};
			function processInstance(instances) {
				$scope.instances = instances.data;
				instances.data.forEach(function(instance) {
					$scope.promise = DiskpoolsUtil.diskpools.save({
						instanceName : instance.instanceName,
						pctUtilized : { '>': 10, '<': 20 },
						devClass : {'-and' : [ {'!=': 'DISK' }, {'!=': 'FILE' }] },
						debug: 1
					}, success).$promise;
				});
			};
			$scope.getDiskpools = function() {
				$scope.diskpools.data = [];
				$scope.selected = [];
				$scope.ipromise = InstanceData.instances.get({
					active : 1,
					hostingLocation : $scope.query.selectedLocation.selectValue
				}, processInstance).$ipromise;
			};
			$scope.getDiskpools();
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
			$scope.showCredentialsDialog = function($event) {
				$mdDialog.show({
					scope: $scope,
					preserveScope: true,
					templateUrl: 'assets/html/login-dialog.html',
					controller: function DialogController($scope, $mdDialog) {
						//$scope.items = items;
						$scope.closeDialog = function() {
							$mdDialog.hide();
						};
						$scope.handleSubmit = function() {
							$mdDialog.hide();
							$scope.selected.forEach(function(pool) {
								console.log(pool.stgPoolName + ' - ' + pool.instanceName + ' - ' + $scope.username + ':' + $scope.password);
								$scope.apromise = ActionMigrate.migrate.get({
									instanceName : pool.instanceName,
									stgPoolName : pool.stgPoolName,
									username : $scope.username,
									password : $scope.password
								}, function(){
										$scope.getDiskpools();
									}).$apromise;
							});
						}
					}
				// controllerAs: 'vm'
				});

			}

		} ]);