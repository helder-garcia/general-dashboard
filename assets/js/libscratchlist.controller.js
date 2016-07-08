var app = angular.module('StarterApp');
app.controller('LibScratchListController', [ 'LibScratch', '$scope',
		function(LibScratch, $scope) {
			'use strict';
			var bookmark;
			$scope.paginationTotalItems = 1;
			$scope.selected = [];
			$scope.query = {
				instanceName : 'TSMBSBLMR1700',
				order : 'libName',
				limit : 10,
				page : 1
			};
			$scope.filter = {
				options : {
					debounce : 500
				}
			};
			$scope.scratches = {
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

			function success(scratches) {
				$scope.scratches = scratches;
			}
			;

			$scope.getScratches = function() {

				$scope.promise = LibScratch.scratches.get({
					instanceName : $scope.query.instanceName
				}, success).$promise;

			};

			$scope.getScratches();

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

		} ]);