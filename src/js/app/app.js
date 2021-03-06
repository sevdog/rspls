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
	// module definition
	ng.module('rspls', ['ngAnimate', 'ngTouch', 'ngRoute', 'ngAria', 'pascalprecht.translate', 'LocalStorageModule']);
	// configure providers
	ng.module('rspls').config(['$routeProvider', '$translateProvider', 'localStorageServiceProvider', configProviders]);
	function configProviders($routeProvider, $translateProvider, localStorageServiceProvider) {
		$routeProvider.when('/rules', {
			templateUrl: 'templates/rules.html',
			controller: 'RulesController'
		}).when('/game', {
			templateUrl: 'templates/game.html',
			controller: 'GameController'
		}).otherwise({redirectTo: '/game'});
		$translateProvider.translations('it', MSG_IT)
			.translations('en', MSG_EN)
			.determinePreferredLanguage()
			.fallbackLanguage('en');
		localStorageServiceProvider
			.setStorageType('localStorage')
			.setPrefix('rspls');
	}
	// define constants
	ng.module('rspls').constant('version', '1.0.2');
	ng.module('rspls').constant('crYearFrom', '2015');
	ng.module('rspls').constant('crYearTo', '');
	ng.module('rspls').constant('crOwner', 'sevdog');
	ng.module('rspls').constant('rules',{
		classics: ['rock', 'scissors', 'paper'],
		signs: ['rock', 'scissors', 'paper', 'lizard', 'spock'],
		wins : {
			rock:     '01010'.split(''),
			scissors: '00110'.split(''),
			paper:    '10001'.split(''),
			lizard:   '00101'.split(''),
			spock:    '11000'.split('')
		}
	});
	ng.module('rspls').constant('phrases',{
		rock: {
			scissors: 'rule.vs.RS',
			lizard: 'rule.vs.RL'
		},
		scissors: {
			paper : 'rule.vs.SP',
			lizard: 'rule.vs.SL'
		},
		paper: {
			rock: 'rule.vs.PR',
			spock: 'rule.vs.PS'
		},
		lizard: {
			paper: 'rule.vs.LP',
			spock: 'rule.vs.LS'
		},
		spock: {
			rock: 'rule.vs.SR',
			scissors: 'rule.vs.SS'
		}
	});
	ng.module('rspls').constant('algorithms',[{
			key: 'random',
			name: 'algorithm.random'
		}, {
			key: 'memory',
			name: 'algorithm.memory'
		}, {
			key: 'memoryAdvanced',
			name: 'algorithm.memoryAdvanced'
	}]);
	// init app
	ng.module('rspls').run(['$rootScope', 'rules', 'phrases', runApp]);
	function runApp($rootScope, rules, phrases) {
		$rootScope.rules = rules;
		$rootScope.phrases = phrases;
	}
})(angular);
