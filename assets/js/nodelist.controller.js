var app = angular.module('StarterApp');
app.controller('NodeListController', ['$http', '$q', '$timeout', '$scope', function($http, $q, $timeout, $scope){
	'use strict';
	$scope.selected = [];
	$scope.query = {
	order: 'nodeName',
	limit: 5,
	page: 1
	};
	$scope.columns = [{
	name: 'nodeName',
	orderBy: 'nodeName'
	}, {
	name: 'domainName',
	orderBy: 'domainName'
	}, {
	name: 'archDelete'
	}, {
	name: 'backDelete'
	}, {
	name: 'isLocked'
	}, {
	name: 'maxNummp',
	numeric: true,
	orderBy: 'maxNummp'
	}];
	$http.get('assets/js/nodes.js').then(function (desserts) {
	$scope.desserts = desserts.data;
	});

	$scope.onpagechange = function(page, limit) {
	console.log('Scope Page: ' + $scope.query.page + ' Scope Limit: ' + $scope.query.limit);
	console.log('Page: ' + page + ' Limit: ' + limit);
	var deferred = $q.defer();
	$timeout(function () {
	deferred.resolve();
	}, 2000);
	return deferred.promise;
	};
	$scope.loadStuff = function () {
	var deferred = $q.defer();
	$timeout(function () {
	deferred.reject();
	}, 2000);
	$scope.deferred = deferred.promise;
	};
	$scope.onorderchange = function(order) {
	console.log('Scope Order: ' + $scope.query.order);
	console.log('Order: ' + order);
	var deferred = $q.defer();
	$timeout(function () {
	deferred.resolve();
	}, 2000);
	return deferred.promise;
	};

}]);