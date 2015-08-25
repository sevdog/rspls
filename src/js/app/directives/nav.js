(function(ng){
	ng.module('rspls')
		.directive('nav', ['$location',
		 function($location) {
			return {
				restrict: 'A',
				link: function postLink(scope, element, attrs, controller) {
					// Watch for the $location
					scope.$watch(function() {
						return $location.path();
					}, function(newValue, oldValue) {
						ng.forEach(element.find('a'), function(a, k) {
							var $a = angular.element(a),
								$li = $a.parent(),
								pattern = $a.attr('href').replace('#', ''),
								regexp = new RegExp('^' + pattern + '$', ['i']);
							if(regexp.test(newValue)) {
								$li.addClass('active');
							} else {
								$li.removeClass('active');
							}
						});
					});
				}
			};
		 }]);
})(angular);
