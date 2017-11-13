
var pslgame = angular.module('pslgame');

pslgame.controller('puzzleController', ['$scope','$modalInstance','$interval','$http',function ($scope, $modalInstance, $interval, $http) {
	$scope.currentSeconds = 15;
	$interval(function () {
		$scope.currentSeconds = 30 - ( new Date().getSeconds());
		if($scope.currentSeconds == 0){
			$modalInstance.dismiss('cancel');
		}
	}, 1000);	
	 
	$scope.submitPuzzle = function () {
		$http.post($scope.apiUrl + "puzzle/answer",{id:$scope.questionID,answer:$scope.answer,userName:'Test'})
                .success(function (data, status, headers, config) {
                    if(status=200){
						$modalInstance.dismiss('cancel');
					}                            
                });		
	};
	
	$scope.closePuzzle = function () {
		$modalInstance.dismiss('cancel');
	};
}]);






