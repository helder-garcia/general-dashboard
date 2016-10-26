var app = angular.module('StarterApp');
app.controller('appChecklistController', [ 'AppCheckListData', 'InstanceData', 'ActionMigrate', '$scope', '$mdDialog', '$q',
		function(AppCheckListData, InstanceData, ActionMigrate, $scope, $mdDialog, $q) {
			'use strict';
			var bookmark;
			$scope.request = null;
			var requests = [];
			$scope.paginationTotalItems = 1;
			$scope.selected = [];
			$scope.username = null;
			$scope.password = null;
			$scope.instances = [];
			$scope.request = null;
			
			$scope.query = {
				instanceName : '',
				selectedLocation : { id: 1, locationName: 'Brasília', selectValue: 'BSA' },
				order : 'instanceName',
				limit : 15,
				page : 1
			};
			$scope.filter = {
				options : {
					debounce : 500
				}
			};
			$scope.instancesCheck = {
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

			function success(instancesCheck) {
				$scope.instancesCheck.data = $scope.instancesCheck.data.concat(instancesCheck.data);
				//$scope.instancesCheck = promises;
				$scope.instancesCheck.count = $scope.instancesCheck.data.length;
			};
			function aprocessInstance(instances) {
				$scope.instances = instances.data;
				instances.data.forEach(function(instance) {
					$scope.promise = AppCheckListData.instancesCheck.get({
						instanceName : instance.instanceName
					}, success);
				});
			};
			function processInstance(instances) {
				$scope.instances = instances.data;			
				instances.data.forEach(function(instance) {
					$scope.request = AppCheckListData.instancesCheck.get({
						instanceName : instance.instanceName
					}, success);
					requests.push($scope.request);
				});
			};
			$scope.getInstancesCheck = function() {
				requests.forEach(function (p) { p.$cancelRequest(); });
				requests = [];
				$scope.instancesCheck.data = [];
				$scope.selected = [];
				$scope.promise = InstanceData.instances.get({
					active : 1,
					hostingLocation : $scope.query.selectedLocation.selectValue
				}, processInstance).$promise;
			};
			$scope.getInstancesCheck();
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
			});
			  $scope.showLog = function(ev, instance) {
				    // Appending dialog to document.body to cover sidenav in docs app
				    // Modal dialogs should fully cover application
				    // to prevent interaction outside of dialog
				  var message = "";
				  if (instance.reason === "") {
					  message = "It seems there is no problem with " + instance.instanceName;
				  } else {
					  message = instance.instanceName + ": " + instance.reason;
				  }
				    $mdDialog.show(
				      $mdDialog.alert()
				        .parent(angular.element(document.querySelector('#popupContainer')))
				        .clickOutsideToClose(true)
				        .title('REASON')
				        .textContent(message)
				        .ariaLabel('Reason Dialog')
				        .ok('Got it!')
				        .targetEvent(ev)
				    );
				  };
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
				});

			}

		} ]);
