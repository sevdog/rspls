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
angular.module('rspls').controller('GameController', 
	['$scope', '$timeout', '$interval', '$translate', 'score', 'settings', 'cpu',
	 function($scope, $timeout, $interval, $translate, score, settings, cpu) {
	var interval,
		startLeft = true;
	$scope.viewCls = 'game';
	$scope.onlyClassic = settings.values.onlyClassic;
	$scope.signs = $scope.onlyClassic ? $scope.rules.classics : $scope.rules.signs;
	$scope.username = settings.values.user;
	$scope.isPlaying = false;
	$scope.timing = false;
	$scope.choose = false;
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
		$scope.timing = false;
		$scope.isPlaying = false;
		$scope.choose = true;
		var rules = $scope.rules;
		$scope.choosedSign = sign;
		// make cpu play
		$scope.pcSign = cpu.choose();
		// determinate the winner
		if ($scope.pcSign.sign === sign) {
			$scope.tie = true;
			score.addGame(false, true);
			$scope.winningPhrase = $translate.instant('tie', {sign:$translate.instant(sign)});
		} else {
			$scope.playerWin = parseInt(rules.wins[sign][$scope.pcSign.idx]);
			if ($scope.playerWin) {
				score.addGame(true);
				$scope.winningPhrase = $scope.phrases[sign][$scope.pcSign.sign];
			} else {
				score.addGame();
				$scope.winningPhrase = $scope.phrases[$scope.pcSign.sign][sign];
			}
		}
		// make CPU learn
		cpu.rememberMove(sign);
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
