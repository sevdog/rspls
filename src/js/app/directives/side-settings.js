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
	ng.module('rspls') .directive('sideSettings', sideSettingsDirective);
	function sideSettingsDirective() {
		return {
			restrict: 'E',
			scope: {
				visible: '='
			},
			templateUrl: 'templates/settings.html',
			controller: ['$route', 'settings', 'algorithms', settingsController],
			controllerAs: 'stg',
			bindToController: true
		};
	}
	// define controller
	function settingsController($route, settings, algorithms) {
		var self = this;
		self.settings = ng.copy(settings.values);
		self.algorithms = algorithms;
		self.reset = resetSettings;
		self.reload = reloadLocation;
		
		function resetSettings() {
			// reset settings
			settings.defaults();
			// copy default settings
			self.settings = ng.copy(settings.values);
			// reload the route to make new settings active
			$route.reload();
			// hide side menu
			self.visible = false;
		}
		function reloadLocation() {
			// save the new settings
			settings.store(self.settings);
			// reload the route to make new settings active
			$route.reload();
			// hide side menu
			self.visible = false;
		}
	}
})(angular)
