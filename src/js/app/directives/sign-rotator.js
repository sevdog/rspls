(function(ng){
	ng.module('rspls')
		.directive('signRotator', ['$interval', '$rootScope',
		 function($interval, $rootScope) {
			return {
				restrict: 'E',
				scope: {
					timeInterval: '=*interval'
				},
				template: '<i class="fa fa-fw fa-2x" ng-class="\'fa-hand-\' + sign + \'-o\'"></i>',
				link: function(scope, element, attrs, controller) {
					var signIdx = 0,
						signs = $rootScope.rules.signs,
						timeInterval = scope.timeInterval || 1000;
					scope.sign = signs[signIdx];
					$interval(function() {
						signIdx = (signIdx + 1) % signs.length;
						scope.sign = signs[signIdx];
					}, timeInterval);
				}
			};
		 }]);
})(angular);
