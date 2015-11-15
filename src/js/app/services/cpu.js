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
angular.module('rspls').factory('cpu', ['settings', 'rules', 'storageWrapper', function(settings, rules, storageWrapper) {
	var CACHE_MAX_SIZE = 100,
		PATTERN_MIN_LENGTH = 4,
		movesCache = {
			// retrive moves from storage or set default
			moves: storageWrapper.get('moves', []),
			push: function(move) {
				this.moves.push(move);
				// work like a LRU cache if exeed max size
				if (this.moves.length >= CACHE_MAX_SIZE) {
					this.moves.shift();
				}
				// save moves after push
				storageWrapper.set('moves', this.moves);
			},
			/**
			 * Will find out the most used sign
			 * @param signs the actual used signs
			 */
			mostUsed: function(signs) {
				return mostUsed(this.moves, signs);
			},
			/**
			 * Will find out all patterns of 4 moves that ends with the last
			 * 3 used moves, considering only the actual used signs
			 * @param signs the actual used signs
			 */
			resamblePattern: function(signs) {
				// first: filter only actual valid moves
				var nextMove,
					validMoves = this.moves.reduce(function(prev, actual) {
					if (signs.indexOf(actual) >= 0) {
						prev.push(actual);
					}
					return prev;
				}, []);
				// calculate patterns only if there are enough moves
				if (validMoves.length > PATTERN_MIN_LENGTH) {
					var possibleNextMove = [],
						movesLength = validMoves.length,
						prevToSearch = validMoves.slice(movesLength - PATTERN_MIN_LENGTH + 1); // sequence to search
					// first iterate over the moves
					for (var i = 0; i < PATTERN_MIN_LENGTH - 1; ++i) {
						var seq = []; // moves sequence
						// second iterate to find sequences
						for (var j = i; j < movesLength; ++j) {
							// push the current element in the sequence
							seq.push(validMoves[j]);
							if (relativeCompareArray(seq, prevToSearch)) {
								// if array partially match check the length
								// and if there is an other element
								if (seq.length === PATTERN_MIN_LENGTH - 1 && j < movesLength - 1) {
									// push next element in partern list
									possibleNextMove.push(validMoves[j + 1]);
									// reset sequence for search
									seq = [];
								}
							} else {
								// sequence doesn't match, so reset
								seq = [];
							}
						}
					}
					if (possibleNextMove.length > 0) {
						// if there is a resambling pattern
						// find out most used among the possibilities
						nextMove = mostUsed(possibleNextMove, signs).sign;
					}
				} else if (validMoves.length === PATTERN_MIN_LENGTH){
					// if the length is pattern length return the last move
					nextMove = validMoves[PATTERN_MIN_LENGTH - 1];
				}
				return nextMove;
			}
		};
	
	/**
	 * Compare equality of two array only for the length of the smaller one
	 */
	function relativeCompareArray(first, second) {
		var eq = true;
		for (var i in first) {
			if (i >= second.length) {
				// exeed second array length, stop
				break;
			}
			if (first[i] !== second[i]) {
				// found different element, stop
				eq = false;
				break;
			}
		}
		return eq;
	}

	/**
	 * Will find out the most used sign in the moves array
	 */
	function mostUsed(moves, signs) {
			var frequencies =  moves.reduce(function(prev, actual) {
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
		// get the most used sing
		for (var sign in frequencies) {
			if (frequencies[sign] > max.count) {
				max.count = frequencies[sign];
				max.sign = sign;
			}
		}
		return max;
	}
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
	
	function choosingAlgotithm(algorithmKey, signs) {
		switch(algorithmKey) {
		case 'memoryAdvanced':
			// search a pattern of moves
			var nextUsed = movesCache.resamblePattern(signs);
			if (nextUsed) {
				// get the winning move
				return getWinningAgainst(nextUsed, signs);
			}
			// if no pattern is found fall back to 'memory' algorithm
		case 'memory':
			// will try to select the sign that wins over the player most used sign
			var mostUsed = movesCache.mostUsed(signs);
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
