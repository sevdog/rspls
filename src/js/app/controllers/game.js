(function(ng){
	ng.module('rspls')
		.controller('GameController', ['$scope', '$timeout', '$interval', '$translate',
		 function($scope, $timeout, $interval, $translate) {
			var interval,
				startLeft = true;
			$scope.isPlaying = false;
			$scope.timing = false;
			$scope.choose = false;
			$scope.counter = {
				play: 0,
				tie: 0,
				win: 0
			}
			$scope.play = function() {
				$scope.isPlaying = true;
				$scope.timing = true;
				$scope.choose = false;

				interval = $interval(function() {
					$scope.pcPos = startLeft ? 'move-left' : 'move-right';
					startLeft = !startLeft;
				}, 400);
				delete $scope.playerWin;
				delete $scope.tie;
				delete $scope.choosedSign;
			}
			$scope.chooseSign = function (sign) {
				$interval.cancel(interval);
				delete $scope.pcPos;
				$scope.counter.play++;
				$scope.timing = false;
				$scope.isPlaying = false;
				$scope.choose = true;
				var rules = $scope.rules;
				$scope.choosedSign = sign;
				$scope.pcSign = parseInt(Math.random() * rules.signs.length);
				if ($scope.pcSign === rules.signs.indexOf(sign)) {
					$scope.tie = true;
					$scope.counter.tie++;
					$scope.winningPhrase = $translate.instant('tie', {sign:$translate.instant(sign)});
				} else {
					$scope.playerWin = parseInt(rules.wins[sign][$scope.pcSign]);
					if ($scope.playerWin) {
						$scope.counter.win++;
						$scope.winningPhrase = $scope.phrases[sign][rules.signs[$scope.pcSign]];
					} else {
						$scope.winningPhrase = $scope.phrases[rules.signs[$scope.pcSign]][sign];
					}
				}
				$timeout(function() {
					$scope.showMsg = true;
					$timeout(function() {
						$scope.showMsg = false;
					}, 1000);
				}, 100)
			};
			$scope.btnClass = function (sign) {
				if (sign != $scope.choosedSign) {
					return 'btn-primary';
				}
				if ($scope.tie) {
					return 'btn-warning';
				}
				if ($scope.playerWin) {
					return 'btn-success';
				}
				return 'btn-danger';
			}
		 }]);
})(angular);
