
angular.module("investorApp").controller('puzzleController', ['$scope','$rootScope','$modalInstance','$interval','$http','investorService','$modal','$window',function ($scope, $rootScope, $modalInstance, $interval, $http,investorService,$modal,$window) {
	
	//Solve Puzzle
    $scope.isSolvePuzzleError = false;
    $scope.errorSolvePuzzleMsg = "";
	$scope.resultSeconds = 30;
	$interval(function () {
		$scope.resultSeconds = $scope.resultSeconds - 1;
		if($scope.resultSeconds == 0){
			$modalInstance.dismiss('cancel');
		}
	}, 1000);	
	 
	$scope.submitPuzzle = function () {
		var param = {"id": $scope.questionID,"answer": $scope.answer,"username":$scope.loggedInUser};
            var myData = $scope.methodSerialize(param); 
            investorService.solvePuzzle(myData)
                 .success(function(response, status, headers, config){  
					$modalInstance.dismiss('cancel');
					$scope.status = status;
					if($scope.status == 201){
						swal({title: "Congratulations!",text: "You mined the block successfully. You are rewarded with 25 coins.",icon: "success",timer: 5000});					
						$rootScope.dashBoardDtl.balance = $rootScope.dashBoardDtl.balance + 25;
						$rootScope.dashBoardDtl.blocksMined = $rootScope.dashBoardDtl.blocksMined + 1;
					}else if ($scope.status == 200){
						swal({title: "Correct answer!",text: "The block has already been mined.",icon: "warning",timer: 5000});							
					}else if($scope.status == 204){
						swal({title: "Sorry!",text: "Incorrect answer.",icon: "error",timer: 5000});										
					}					
                }).error(function(error){ 
                   $scope.isSolvePuzzleError = true;
                   $scope.errorSolvePuzzleMsg = error;
        });	
		 
	};
	
	$scope.closePuzzle = function () {
		$modalInstance.dismiss('cancel');
	};
}]);






