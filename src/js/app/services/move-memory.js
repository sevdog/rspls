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
	// define constants
	var CACHE_MAX_SIZE = 100,
		PATTERN_MIN_LENGTH = 4;
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
	// define factory
	ng.module('rspls').factory('moveMemory', ['storageWrapper', moveMemoryService]);
	function moveMemoryService(storageWrapper) {
		var factory = {
			// retrive moves from storage or set default
			moves: storageWrapper.get('moves', []),
			push: pushInMemory,
			mostUsed: mostUsedMove,
			resamblePattern: resamblePattern
		};
		return factory;
		
		function pushInMemory(move) {
			factory.moves.push(move);
			// work like a LRU cache if exeed max size
			if (factory.moves.length >= CACHE_MAX_SIZE) {
				factory.moves.shift();
			}
			// save moves after push
			storageWrapper.set('moves', factory.moves);
		}
		/**
		 * Will find out the most used sign
		 * @param signs the actual used signs
		 */
		function mostUsedMove(signs) {
			return mostUsed(factory.moves, signs);
		}
		/**
		 * Will find out all patterns of 4 moves that ends with the last
		 * 3 used moves, considering only the actual used signs
		 * @param signs the actual used signs
		 */
		function resamblePattern(signs) {
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
	}
})(angular);
