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
	//TODO add support for storage
	var CACHE_MAX_SIZE = 100;
		movesCache = {
			moves: [],
			push: function(move) {
				this.moves.push(move);
				// work like a LRU cache if exeed max size
				if (this.moves.length >= CACHE_MAX_SIZE) {
					this.moves.shift();
				}
			}
		};
	
	function choosingAlgotithm(algorithmKey, signs) {
		switch(algorithmKey) {
		case 'memoryAdvanced':
			//TODO implement, for now fallback to memory
		case 'memory':
			//TODO implement, for now fallback in random
		case 'random':
		default:
			return parseInt(Math.random() * signs.length);
		}
	}
	
	return {
		/**
		 * Perform CPU sign choose based on current algorithm
		 */
		choose: function() {
			var signs = settings.values.onlyClassic ? rules.classics : rules.signs,
				pcSign = choosingAlgotithm(settings.values.algorithm, signs);
			return {
				idx: pcSign,
				sign: signs[pcSign]
			};
		},
		/**
		 * Add the selected moves in the CPU memory
		 */
		rememberMove: function(sign) {
			movesCache.push(sign);
		}
	};
}]);
