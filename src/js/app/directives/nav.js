/**
 *  Copyright 2015 sevdog

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */
(function(ng) {
	// define directive
	ng.module('rspls').directive('nav', ['$location', navDirective]);
	function navDirective($location) {
		return {
			restrict: 'A',
			scope: false,
			link: navLink
		};
		// define link
		function navLink(scope, element) {
			// Watch for the $location
			scope.$watch(function() {
				return $location.path();
			}, function(newValue, oldValue) {
				angular.forEach(element.find('a'), function(a) {
					var $a = angular.element(a),
						$li = $a.parent(),
						pattern = $a.attr('href').replace('#', ''),
						regexp = new RegExp('^' + pattern + '$', ['i']);
					if (scope.navOpen) {
						scope.navOpen = false;
					}
					if(regexp.test(newValue)) {
						$li.addClass('active');
					} else {
						$li.removeClass('active');
					}
				});
			});
		}
	}
})(angular);

