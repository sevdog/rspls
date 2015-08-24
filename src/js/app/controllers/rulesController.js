(function(ng){
	ng.module('rspls')
		.controller('RulesController', ['$scope',
		 function($scope) {
			$scope.winMatch = function(sign) {
				 var wins = $scope.rules.wins[sign];
				 return function (value, index, array){
					 return parseInt(wins[index]);
				 }
			 }
		 }]);
})(angular);
