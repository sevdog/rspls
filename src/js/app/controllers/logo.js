(function(ng){
	ng.module('rspls')
		.controller('LogoController', ['$scope', '$interval',
		 function($scope, $interval) {
			var signIdx = 0,
				signs = $scope.rules.signs;
			$scope.sign = signs[signIdx];
			$interval(function() {
				signIdx = (signIdx + 1) % signs.length;
				$scope.sign = signs[signIdx];
			}, 3000);
		 }]);
})(angular);
