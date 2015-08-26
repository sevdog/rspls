(function(ng){
	ng.module('rspls')
		.controller('GameController', ['$scope',
		 function($scope) {
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
				delete $scope.playerWin;
				delete $scope.tie;
			}
			$scope.chooseSign = function (sign) {
				$scope.counter.play++;
				$scope.timing = false;
				$scope.isPlaying = false;
				$scope.choose = true;
				var rules = $scope.rules;
				$scope.pcSign = parseInt(Math.random() * rules.signs.length);
				if ($scope.pcSign === rules.signs.indexOf(sign)) {
					$scope.tie = true;
					$scope.counter.tie++;
					return;
				}
				$scope.counter.win++;
				$scope.playerWin = rules.win[sign][$scope.pcSign];
			};
		 }]);
})(angular);
