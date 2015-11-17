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
	ng.module('rspls').factory('score', ['storageWrapper', scoreService]);
	function scoreService(storageWrapper) {
		var factory = {},
			// retrive score from storage or set default
			score = storageWrapper.get('score', {
				play: 0,
				tie: 0,
				win: 0
		});
		
		// making game, win, tie and lost key readonly
		Object.defineProperty(factory, 'game', {
			get: function() {
				return score.play;
			}
		});
		Object.defineProperty(factory, 'win', {
			get: function() {
				return score.win;
			}
		});
		Object.defineProperty(factory, 'tie', {
			get: function() {
				return score.tie;
			}
		});
		Object.defineProperty(factory, 'lost', {
			get: function() {
				return score.play - score.win - score.tie;
			}
		});
		// situation tell if player is winning ( > 0 ), losing ( < 0 ) or tieing ( = 0)
		Object.defineProperty(factory, 'situation', {
			get: function() {
				return 2 * score.win - score.play + score.tie;
			}
		});
		factory.addGame = function(win, tie) {
			// increase game counter
			score.play++;
			if (win) {
				score.win++;
			} else if (tie) {
				score.tie++
			}
			// save score
			storageWrapper.set('score', score);
		};
		return factory;
	}
})(angular);