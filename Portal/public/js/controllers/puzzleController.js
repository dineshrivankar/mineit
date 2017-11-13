
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


// Directive to allow only numbers
pslgame.directive('validNumber', function() {
	return {
		require: '?ngModel',
        link: function(scope, element, attrs, ngModelCtrl) {
			if(!ngModelCtrl) {
				return; 
			}
			
			ngModelCtrl.$parsers.push(function(val) {
				if (angular.isUndefined(val)) {
					var val = '';
				}
				
				var clean = val.replace(/[^-0-9]/g, '');
				var negativeCheck = clean.split('-');
				
				if(!angular.isUndefined(negativeCheck[1])) {
					negativeCheck[1] = negativeCheck[1].slice(0, negativeCheck[1].length);
					clean =negativeCheck[0] + '-' + negativeCheck[1];
					if(negativeCheck[0].length > 0) {
						clean =negativeCheck[0];
					}                
				}
				
				if (val !== clean) {
				  ngModelCtrl.$setViewValue(clean);
				  ngModelCtrl.$render();
				}
				return clean;
			});

			element.bind('keypress', function(event) {
				if(event.keyCode === 32) {
					event.preventDefault();
				}
			});
		}
    };
});



