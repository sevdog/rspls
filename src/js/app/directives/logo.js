(function(ng){
	ng.module('rspls')
		.directive('logo', ['$interval',
		 function($interval) {
			return {
				restrict: 'E',
				template: '<i class="fa fa-fw fa-2x" ng-class="\'fa-hand-\' + sign + \'-o\'"></i>',
				link: function postLink(scope, element, attrs, controller) {
					var signIdx = 0,
					signs = scope.rules.signs;
					scope.sign = signs[signIdx];
					$interval(function() {
						signIdx = (signIdx + 1) % signs.length;
						scope.sign = signs[signIdx];
					}, 3000);
				}
			};
		 }]);
})(angular);
