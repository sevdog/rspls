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
angular.module('rspls')
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
