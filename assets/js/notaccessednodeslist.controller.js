var app = angular.module('StarterApp');
app.controller('NotAccessedNodesController', [ 'NotAccessedNodes', '$http', '$q',
		'$timeout', '$scope',
		function(NotAccessedNodes, $http, $q, $timeout, $scope) {
			'use strict';
			$scope.isOpen = false;
			$scope.nodesOccupancyToolBar = {
				isOpen : false,
				count : 0,
				selectedDirection : 'left'
			};
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
					    multiSelect: false,
					    autoSelect: true,
					    decapitate: false,
					    largeEditDialog: false,
					    boundaryLinks: false,
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
			$scope.nodes = NotAccessedNodes.query();

			$scope.onpagechange = function(page, limit) {
				var deferred = $q.defer();
				$timeout(function() {
					deferred.resolve();
				}, 2000);
				return deferred.promise;
			};
			$scope.loadStuff = function() {
				var deferred = $q.defer();
				$timeout(function() {
					deferred.reject();
				}, 2000);
				$scope.deferred = deferred.promise;
			};
			$scope.onorderchange = function(order) {
				var deferred = $q.defer();
				$timeout(function() {
					deferred.resolve();
				}, 2000);
				return deferred.promise;
			};

		} ]);