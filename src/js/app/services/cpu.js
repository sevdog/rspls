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
	// define factory
	ng.module('rspls').factory('cpu', ['settings', 'rules', 'moveMemory', cpuService]);
	function cpuService(settings, rules, moveMemory) {
		var factory = {
			choose: chooseSign,
			rememberMove: rememberMove
		};
		
		return factory;
	
		/**
		 * Will get a winning move over enemy's one
		 */
		function getWinningAgainst(enemySign, signs) {
			var signWins = rules.wins[enemySign].slice(0, signs.length),
				signIdx = signs.indexOf(enemySign);
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
	
		/**
		 * Perform move choice based on the selected algorithm
		 */
		function choosingAlgotithm(algorithmKey, signs) {
			switch(algorithmKey) {
			case 'memoryAdvanced':
				// search a pattern of moves
				var nextUsed = moveMemory.resamblePattern(signs);
				if (nextUsed) {
					// get the winning move
					return getWinningAgainst(nextUsed, signs);
				}
				// if no pattern is found fall back to 'memory' algorithm
			case 'memory':
				// will try to select the sign that wins over the player most used sign
				var mostUsed = moveMemory.mostUsed(signs);
				// make pondered choice only if there are data
				if (mostUsed.count > 0) {
					// get the winning move
					return getWinningAgainst(mostUsed.sign, signs);
				}
				// if CPU is without any data fallback to random
			case 'random':
			default:
				return parseInt(Math.random() * signs.length);
			}
		}
		/**
		 * Perform CPU sign choose based on current algorithm
		 */
		function chooseSign() {
			var signs = settings.values.onlyClassic ? rules.classics : rules.signs,
				pcSign = choosingAlgotithm(settings.values.algorithm, signs);
			return {
				idx: pcSign,
				sign: signs[pcSign]
			};
		}
		/**
		 * Add the selected moves in the CPU memory
		 */
		function rememberMove(sign) {
			moveMemory.push(sign);
		}
	};
})(angular);