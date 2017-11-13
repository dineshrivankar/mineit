var pslgame = angular.module('pslgame');

pslgame.controller('sendCoinsController', function($scope , $http, $rootScope) {
    
    $scope.users =[];
				  
	var url = apiUrl + '/users';
		$http.get(url).success(function (response) {
			console.log("Users success response", response);
			angular.forEach(response, function(value, key) {
				$scope.users.push({name: value.userName,id:value._id});
			});
		}).catch(function (response) {
			console.log("Login failed response!", response);
			// TODO - Show error on login
		})
		
	$scope.sendCoins = function () {
		var url = apiUrl + '/deals ';
		data = { 
				fromUser: $rootScope.globals.currentUser.username,
				toUser: 'shaggy_grape',//$scope.toUser,
				amount: $scope.amount
				};
		$http.post(url, data).success(function (response) {
			console.log("Deal success response", response);
		}).catch(function (response) {
			console.log("Login failed response!", response);
			// TODO - Show error on login
		})
	}
	
});