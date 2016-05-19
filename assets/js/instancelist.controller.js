var app = angular.module('StarterApp');
app.controller('InstanceListController', [
        'instanceData',
		'$http',
		'$q',
		'$timeout',
		'$scope',
		function(instanceData, $http, $q, $timeout, $scope) {
			'use strict';
		      $scope.isOpen = false;
		      $scope.instanceToolBar = {
		        isOpen: false,
		        count: 0,
		        selectedDirection: 'left'
		      };
			$scope.selected = [];
			$scope.query = {
				order : 'instanceName',
				limit : 10,
				page : 1
			};
			$scope.columns = [ {
				name : 'Nome',
				orderBy : 'instanceName'
			}, {
				name : 'Localização',
				orderBy : 'hostingLocation'
			}, {
				name : 'Ativa'
			}, {
				name : 'Reserva'
			}, {
				name : 'Nodes',
				orderBy : 'nodesCount'
			}, {
				name : 'Ação'
			} 
			];
		    $scope.get = function () {
		        $scope.items = instanceData.ajaxItems();
		        //the model returns a promise and THEN items
		        $scope.items.then(function (items) {
		            $scope.instances = items;
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