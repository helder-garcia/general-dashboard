var app = angular.module('StarterApp');
app.controller('LibScratchListController', [
        'libScratchData',
		'$http',
		'$q',
		'$timeout',
		'$scope',
		function(libScratchData, $http, $q, $timeout, $scope) {
			'use strict';
		      $scope.isOpen = false;
		      $scope.instanceToolBar = {
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
				orderBy : 'scratchVols'
			} 
			];
		    $scope.get = function () {
		        $scope.items = libScratchData.ajaxItems();
		        //the model returns a promise and THEN items
		        $scope.items.then(function (items) {
		            $scope.libScratches = items;
		        }, function (status) {
		        });
		    };
		    $scope.get();

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