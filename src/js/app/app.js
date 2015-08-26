(function(ng){
	var app = ng.module('rspls', ['ngAnimate', 'ngTouch', 'ngRoute', 'ngAria',
	                              'pascalprecht.translate']);
	app.config(['$routeProvider', '$translateProvider',
	            function($routeProvider, $translateProvider) {
		$routeProvider.when('/rules', {
			templateUrl: 'templates/rules.html',
			controller: 'RulesController'
		}).when('/game', {
			templateUrl: 'templates/game.html',
			controller: 'GameController'
		}).otherwise({redirectTo: '/rules'});
		$translateProvider.translations('it', MSG_IT)
			.translations('en', MSG_EN)
			.determinePreferredLanguage()
			.fallbackLanguage('en');
	}]);
	
	app.run(['$rootScope', function($rootScope) {
		var gameMechanism = {
			signs: ['rock', 'scissors', 'paper', 'lizard', 'spock'],
			wins : {
				rock:     '01010'.split(''),
				scissors: '00110'.split(''),
				paper:    '10001'.split(''),
				lizard:   '00101'.split(''),
				spock:    '11000'.split('')
			}
		};
		$rootScope.rules = gameMechanism;
		$rootScope.phrases = {
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
		}
	}]);
})(angular);
