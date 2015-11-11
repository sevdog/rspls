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
angular.module('rspls').factory('cpu', ['settings', 'rules', 'storage', function(settings, rules, storage) {
	var CACHE_MAX_SIZE = 100;
		movesCache = {
			// retrive moves from storage or set default
			moves: storage.get('moves', []),
			push: function(move) {
				this.moves.push(move);
				// work like a LRU cache if exeed max size
				if (this.moves.length >= CACHE_MAX_SIZE) {
					this.moves.shift();
				}
				// save moves after push
				storage.set('moves', this.moves);
			},
			mostUsed: function(signs) {
				var frequencies =  this.moves.reduce(function(prev, actual) {
						// count only used signs
						if (signs.indexOf(actual) >= 0) {
							// update count
							prev[actual] = prev[actual] ? prev[actual] + 1 : 1;
						}
						return prev;
					}, {}),
					max = {
						sign: '',
						count: 0
					};
				for (var sign in frequencies) {
					if (frequencies[sign] > max.count) {
						max.count = frequencies[sign];
						max.sign = sign;
					}
				}
				return max;
			}
		};
	
	function choosingAlgotithm(algorithmKey, signs) {
		switch(algorithmKey) {
		case 'memoryAdvanced':
			//TODO implement, for now fallback to memory
		case 'memory':
			// will try to select the sign that wins over the player most used sign
			var mostUsed = movesCache.mostUsed(signs);
			// make pondered choice only if there are data
			if (mostUsed.count > 0) {
				var signWins = rules.wins[mostUsed.sign].slice(0, signs.length),
					signIdx = signs.indexOf(mostUsed.sign);
				// put sign wins on sign idx
				signWins[signIdx] = 1;
				// filter array to get only signs which wins against it
				signWins = signWins.reduce(function(prev, actual, idx) {
					if (actual == 0) {
						prev.push(signs[idx])
					}
					return prev;
				}, []);
				// return a random element of the winning ones
				return signs.indexOf(signWins[parseInt(Math.random() * signWins.length)]);
			}
			// if CPU is without any data fallback to random
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
