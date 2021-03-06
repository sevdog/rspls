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
(function(ng){
	// define directive
	ng.module('rspls').directive('stats', statsDirective);
	function statsDirective() {
		return {
			restrict: 'E',
			scope: {
				display: '='
			},
			templateUrl: 'templates/stats.html',
			controller: ['$timeout', 'score', statsController],
			controllerAs: 'stats',
			bindToController: true
		};
	};
	// define controller
	function statsController($timeout, score) {
		var self = this;
		self.pct = function(prop) {
			if (!score.game) {
				// if there are no games retuno 0
				return 0;
			}
			// it will return the pct relative to max value of stats
			var max = Math.max(score.win, score.lost, score.tie);
			return score[prop] / max * 100;
		};
	}
})(angular);
