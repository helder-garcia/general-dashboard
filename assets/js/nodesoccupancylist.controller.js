var app = angular.module('StarterApp');
app.controller('NodesOccupancyController', [ 'NodesOccupancy', '$http', '$q',
		'$timeout', '$scope',
		function(NodesOccupancy, $http, $q, $timeout, $scope) {
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
			$scope.columns = [ 
			{
				name : 'Node Name',
				orderBy : 'nodeName'
			}, {
				name : 'Domain',
				orderBy : 'domainName'
			}, {
				name : 'Logical GB',
				orderBy : 'logicalGB'
			} ];

			$scope.nodes = NodesOccupancy.query();

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