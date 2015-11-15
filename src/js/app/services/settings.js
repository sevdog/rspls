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
angular.module('rspls').factory('settings', ['storageWrapper', function(storageWrapper) {
	// default values for settings
	var defaults = {
			user: '',
			theme: '',
			algorithm: 'random',
			onlyClassic: false
		},
		// get used settings or default
		used = storageWrapper.get('settings', defaults);

	return {
		values: angular.copy(used),
		/**
		 * Stores new values in settings.
		 * @param values the new values to store in settings 
		 */
		store: function(values) {
			this.values = angular.merge({}, values);
			// store settings
			storageWrapper.set('settings', this.values);
		},
		/**
		 * Restores defaults values.
		 */
		defaults: function() {
			// restore defaults values
			this.store(defaults);
		}
	};
}]);
