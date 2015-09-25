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
angular.module('rspls').controller('SettingsController', ['$scope', '$route', 'settings', function($scope, $route, settings) {
	$scope.settings = angular.copy(settings.values);
	
	$scope.reset = function() {
		settings.defaults();
		$scope.settings = angular.copy(settings.values);
		$route.reload();
		$scope.status.showSideMenu = false;
	};
	
	$scope.reload = function() {
		settings.store($scope.settings);
		$route.reload();
		$scope.status.showSideMenu = false;
	};
}]);
