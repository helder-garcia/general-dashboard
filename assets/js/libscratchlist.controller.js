var app = angular.module('StarterApp');
app.controller('LibScratchListController', [
        'LibScratch',
		'$http',
		'$q',
		'$timeout',
		'$scope',
		function(LibScratch, $http, $q, $timeout, $scope) {
			'use strict';
		      $scope.isOpen = false;
		      $scope.libScratchToolBar = {
		        isOpen: false,
		        count: 0,
		        selectedDirection: 'left'
		      };
			$scope.selected = [];
			$scope.query = {
				order : 'libName',
				limit : 10,
				page : 1
			};
			$scope.columns = [
			{
				name : 'Library',
				orderBy : 'libName'
			}, {
				name : 'Scratch',
				orderBy : 'scratch'
			} 
			];
			
			$scope.scratchVols = LibScratch.query();

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