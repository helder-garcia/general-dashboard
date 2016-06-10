var app = angular.module('StarterApp');
app.controller('DomainFilterListController', [ '$timeout', '$scope',
		function($timeout, $scope) {
	  $scope.domain = null;
	  $scope.domains = null;
	  $scope.loadDomains = function() {
	    // Use timeout to simulate a 650ms request.
	    return $timeout(function() {
	      $scope.domains =  $scope.domains  || [
	        { id: 0, domainName: 'Domínios: Todos', selectValue: undefined },
	        { id: 1, domainName: 'DOMINO', selectValue: 'DOMINO' },
	        { id: 2, domainName: 'LINUX', selectValue: 'LINUX' },
	        { id: 3, domainName: 'UNIX', selectValue: 'UNIX' },
	        { id: 4, domainName: 'WINDOWS', selectValue: 'WINDOWS' },
	        { id: 5, domainName: 'SQL', selectValue: 'SQL' }
	      ];
	    }, 650);
	  };	
}]);