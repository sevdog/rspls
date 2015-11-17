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
	ng.module('rspls').directive('signRotator', singRotatorDirective);
	function singRotatorDirective() {
		return {
			restrict: 'E',
			scope: {
				timeInterval: '=*interval',
				onlyClassic: '=*'
			},
			template: '<i class="fa fa-fw fa-2x" ng-class="\'fa-hand-\' + sgn.sign + \'-o\'"></i>',
			controller: ['$scope', '$interval', 'rules', singRotatorController],
			controllerAs: 'sgn',
			bindToController: true
		};
	}
	// define controller
	function singRotatorController($scope, $interval, rules) {
		var self = this,
			signIdx = 0,
			signs = self.onlyClassic ? rules.classics : rules.signs,
			timeInterval = self.timeInterval || 1000,
			theInterval;
		self.sign = signs[signIdx];
		
		theInterval = $interval(function() {
			signIdx = (signIdx + 1) % signs.length;
			self.sign = signs[signIdx];
		}, timeInterval);
		$scope.$on('$destroy', function() {
			$interval.cancel(theInterval);
		});
	}
})(angular);