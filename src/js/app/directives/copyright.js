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
	// define copyright directive
	angular.module('rspls').directive('copyRight', copyRightDirective);
	function copyRightDirective() {
		return {
			restrict: 'E',
			scope: {},
			controllerAs: 'cpr',
			controller: ['version', 'crYearTo', 'crYearFrom', 'crOwner', copyRightController],
			template: '<footer class="text-right text-muted">' +
				'<h5>{{:: \'version\' | translate }} {{:: cpr.version }}</h5>' +
				'<i class="fa fa-copyright"></i> {{:: cpr.year }} {{ cpr.owner }}' +
				'</footer>'
		}
	}
	// define controller
	function copyRightController(version, crYearTo, crYearFrom, crOwner) {
		var self = this;
		self.version = version;
		self.year = crYearFrom + (crYearTo ? '-' + crYearTo : '');
		self.owner = crOwner;
	}
})(angular);
