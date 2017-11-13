
var pslgame = angular.module('pslgame');

pslgame.controller('indexController', ['$scope', '$rootScope', '$http', '$location','$cookieStore', function ($scope, $rootScope, $http, $location, $cookieStore) {


	$rootScope.globals = {};
    $cookieStore.remove('globals');
	
	$scope.login = function () {

		$rootScope.username = $scope.username
		console.log("Username in rootScope.username", $rootScope.username);

		var url = apiUrl + '/users/register';
		data = { username: $rootScope.username }

		$http.post(url, data).success(function (response) {
			console.log("Login success response", response);
			$rootScope.globals = {
                            currentUser: {
                                username: $rootScope.username,
                                pslCoins: 1000
                            }
                        };
            $cookieStore.put('globals', $rootScope.globals);
			$location.path('/dashboard');
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