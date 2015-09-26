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
angular.module('rspls').factory('cpu', ['settings', 'rules', function(settings, rules) {
	return {
		choose: function() {
			//TODO add algorithm choosing
			var signs = settings.values.onlyClassic ? rules.classics : rules.signs,
				pcSign = parseInt(Math.random() * signs.length);
			return {
				idx: pcSign,
				sign: signs[pcSign]
			};
		}
	};
}]);
