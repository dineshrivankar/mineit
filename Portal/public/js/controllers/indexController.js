
var pslgame = angular.module('pslgame');

pslgame.controller('indexController', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {

	$scope.login = function () {

		$rootScope.username = $scope.username
		console.log("Username in rootScope.username", $rootScope.username);

		var url = apiUrl + '/users/register';
		data = { username: $rootScope.username }

		$http.post(url, data).success(function (response) {
			console.log("Login success response", response);
			// TODO - Redirect to dashboard
		}).catch(function (response) {
			console.log("Login failed response!", response);
			// TODO - Show error on login
		})
	}


	$scope.generateUserName = function () {
		var url = apiUrl + '/users/generate/names';

		$http.get(url).success(function (response) {
			console.log("generateUserName success response", response);
			$scope.username = JSON.parse(response);
		}).catch(function (response) {
			console.log("generateUserName failed response!", response);
		})
	}

}]);