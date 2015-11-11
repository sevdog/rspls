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
angular.module('rspls').factory('storage', ['localStorageService', function(localStorageService) {
	var factory = {};
	factory.get = function(key, dft) {
		var toReturn = dft;
		if (localStorageService.isSupported) {
			// if is supported return the key if present
			// otherwise return default
			toReturn = localStorageService.get(key) || dft;
		}
		return toReturn;
	};
	
	factory.set = function(key, value) {
		if (localStorageService.isSupported) {
			// if is supported return the key if present
			// otherwise return default
			localStorageService.set(key, value) || dft;
		}
	};
	return factory;
}]);
